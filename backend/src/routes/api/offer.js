import { Router } from "express";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import Offer from "../../models/Offer.js";
import Product from "../../models/Product.js";
import { offerSchema } from "../../validators/offer-validator.js";
import { OFFER_STATUS } from "../../../../const/offerStatus.js";

const router = Router();

// GET api/offers - get general offer info
router.get("/", requireJWTAuth, async (req, res) => {
  const offersTo = await Offer.find({ "to.user": req.user._id }).populate(
    "to.products",
    "name"
  );
  const offerFrom = await Offer.find({ "from.user": req.user._id }).populate(
    "to.products",
    "name"
  );

  res.send({ to: offersTo, from: offerFrom });
});

// GET api/offers/id - get detailed offer if you are sender or provider
router.get("/:id", requireJWTAuth, async (req, res) => {
  const offer = await Offer.findOne({
    _id: req.params.id,
    $or: [{ "to.user": req.user._id }, { "from.user": req.user._id }],
  })
    .populate("to.user")
    .populate("to.products")
    .populate("from.user")
    .populate("from.products");

  if (!offer) return res.status(404).send();

  res.send(offer);
});

// POST api/offers - send new offer
router.post("/", requireJWTAuth, async (req, res) => {
  const { error } = offerSchema.validate(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  const { to, products } = req.body;

  //check products for owners
  try {
    const userProducts = await Product.find({
      _id: {
        $in: to.products,
      },
      owner: to.user,
    });
    if (userProducts.length !== to.products.length)
      throw new Error("User doesn't have products with these ids");

    const myProducts = await Product.find({
      _id: {
        $in: products,
      },
      owner: req.user._id,
    });
    console.log(myProducts.length);
    if (myProducts.length !== products.length)
      throw new Error("You don't have products with these ids");
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }

  const offer = await new Offer({
    to,
    from: {
      user: req.user._id,
      products,
    },
    status: "Відправлено",
  });

  await offer.save();
  res.send(offer);
});

// PATCH api/offers/id - change offer status (available only for reveiver)
router.patch("/:id", requireJWTAuth, async (req, res) => {
  const offer = await Offer.findOne({
    _id: req.params.id,
    "to.user": req.user._id,
  });

  if (!offer)
    return res.status(404).send({ message: "Такої пропозиції не знайдено" });

  if (!OFFER_STATUS.includes(req.body.status))
    return res.status(404).send({ messgae: "Не вірний статус" });
  offer.status = req.body.status;
  await offer.save();
  res.send();
});

export default router;
