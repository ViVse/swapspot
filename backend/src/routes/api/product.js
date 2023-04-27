import { Router } from "express";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import Product from "../../models/Product.js";
import { productSchema } from "../../validators/product-validator.js";
import { CATEGORIES } from "../../../../const/categories.js";
import imgUploadHandler from "../../middleware/imgUploadHandler.js";
import storage from "../../config/storage.js";

const router = Router();

// GET api/products - get products
router.get("/", async (req, res) => {
  // Configure match
  const match = {};
  //    Search by owner
  if (req.query.owner) {
    match.owner = req.query.owner;
  }
  //    Search by category
  if (req.query.category) {
    if (!CATEGORIES.isValidCategory(req.query.category))
      return res.status(400).send();

    let categoriesToSearch = [req.query.category];
    if (!CATEGORIES.isSubCategory(req.query.category))
      categoriesToSearch = categoriesToSearch.concat(
        CATEGORIES.getSubCategories(req.query.category)
      );

    match.category = { $in: categoriesToSearch };
  }
  //    Search by location
  if (req.query.location) {
    const regx = new RegExp(`(${req.query.location})`, "i");
    match.location = regx;
  }

  // Configure sort
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  const products = await Product.find(match, null, {
    skip: parseInt(req.query.skip),
    limit: parseInt(req.query.limit),
    sort,
  });
  res.send(products);
});

// POST api/products - create product
router.post("/", requireJWTAuth, async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  const { name, category, description, tags, location } = req.body;
  const product = await new Product({
    name,
    category,
    description,
    tags,
    location,
    owner: req.user._id,
  });

  await product.save();
  res.send(product);
});

// GET api/products/:id - get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT api/products/:id/imgs - change product imgs
router.put(
  "/:id/imgs",
  requireJWTAuth,
  imgUploadHandler.array("productImgs[]"),
  async (req, res) => {
    // Determin whether logged in user is an owner
    const product = await Product.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!product)
      return res
        .status(404)
        .send({ message: "You do not have product with such id" });

    if (!req.files) {
      return res.status(400).send({ message: "no imgs provided" });
    }

    // delete previous files
    if (product.imgs.length > 0) {
      try {
        for (const img of product.imgs) {
          await storage.file(img.path).delete();
        }
      } catch (e) {
        return res
          .send(500)
          .send({ message: "Couldn't delete previous messages" });
      }
    }

    // upload files
    let savedFiles = [];
    for (const img of req.files) {
      try {
        let file = storage.file(
          `productImgs/${Date.now()}_${Math.random()}_${img.originalname}`
        );

        await file.save(img.buffer);
        await file.makePublic();
        savedFiles.push(file);
      } catch (e) {
        console.log(`Couldn't save file: ${e}`);
      }
    }

    // update product info
    try {
      product.imgs = savedFiles.map((img) => ({
        path: img.name,
        publicUrl: img.publicUrl(),
      }));

      await product.save();
      res.send(product);
    } catch (e) {
      if (savedFiles.length > 0) {
        savedFiles.forEach(async (file) => {
          await storage.file(file.name).delete();
        });
      }
      console.error(e);
      res.status(500).send({ message: "Couldn't update product info" });
    }
  }
);

// DELETE api/products/:id - delete img
router.delete("/:id", requireJWTAuth, async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!product)
    return res
      .status(404)
      .send({ message: "You do not have product with such id" });

  try {
    await Product.findByIdAndDelete(product._id);
    res.send(product);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
});

export default router;
