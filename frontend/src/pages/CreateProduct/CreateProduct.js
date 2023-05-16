import { useRef, useState } from "react";
import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { GrFormClose } from "react-icons/gr";

import useInput from "../../hooks/use-input";
import { notEmptyRule } from "../../utils/inputValidationRules";
import Input from "../../components/UI/Input";
import { CATEGORIES } from "../../const/categories";
import ImgUpload from "../../components/UI/ImgUpload";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(notEmptyRule);

  const [category, setCategory] = useState(CATEGORIES.getCategoriesArr()[0]);

  const {
    value: newTagValue,
    valueChangeHandler: newTagChangeHandler,
    reset: resetNewTag,
  } = useInput(() => {});

  const [tags, setTags] = useState([]);

  const [imgFiles, setImgFiles] = useState([]);

  const descRef = useRef();

  const {
    value: locationValue,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocation,
  } = useInput(notEmptyRule);

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const addTagHandler = () => {
    if (newTagValue.trim().length === 0 || tags.includes(newTagValue)) return;
    setTags((prev) => [...prev, newTagValue.trim()]);
    resetNewTag();
  };

  const removeTagHandler = (tag) => {
    setTags((prev) => prev.filter((tg) => tg !== tag));
  };

  const changeFileHandler = (ind, file) => {
    setImgFiles((prev) => {
      const newArr = [...prev];
      newArr[ind] = file;
      return newArr;
    });
  };

  const addFileHandler = (file) => {
    setImgFiles((prev) => [...prev, file]);
  };

  const removeFileHandler = (file) => {
    setImgFiles((prev) => prev.filter((f) => f.name !== file.name));
  };

  const addMultipleFilesHandler = (e) => {
    setImgFiles((prev) => [...prev, ...e.target.files]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameIsValid || !locationIsValid) return;

    let res;
    try {
      res = await axios.post("/api/products", {
        name: nameValue,
        category,
        description: descRef.current.value,
        tags,
        location: locationValue,
      });
    } catch (err) {
      console.log("couldn't create product");
    }

    try {
      var bodyFormData = new FormData();
      imgFiles.forEach((file) => bodyFormData.append("productImgs[]", file));
      const imgRes = await axios.put(
        `/api/products/${res.data._id}/imgs`,
        bodyFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(imgRes);
    } catch (e) {
      console.log("Couldn't save imgs");
    }

    // Reset fields
    resetName();
    setCategory(CATEGORIES.getCategoriesArr()[0]);
    resetNewTag();
    setImgFiles([]);
    descRef.current.value = "";
    resetLocation();

    navigate(`/product/${res.data._id}`);
  };

  return (
    <form className="container mx-auto px-4 mb-20" onSubmit={submitHandler}>
      <h1 className="font-bold text-3xl mt-2">Створити оголошення</h1>
      {/* Name and category */}
      <Card className="mt-5">
        <div>
          <h2 className="font-bold text-2xl mb-3">Опишіть ваш предмет</h2>
          <Input
            label="Назва"
            placeholder="Телефон"
            value={nameValue}
            hasError={nameHasError}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            required={true}
          />
          {nameHasError && (
            <span className="block text-red-800">
              Назва не може бути пустою
            </span>
          )}
          <div className="mt-3">
            <label className="text-xl block font-medium text-teal-900">
              Категорія
            </label>
            <select
              className="rounded-lg w-full bg-gray-50 border border-solid h-10 px-2 mt-2 border-teal-900 focus-visin:outline-teal-900"
              value={category}
              onChange={categoryChangeHandler}>
              {CATEGORIES.getCategoriesArr().map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      {/* Photo */}
      <Card className="mt-5">
        <div>
          <h2 className="font-bold text-2xl">Фото</h2>
          <p className="text-lg mt-1 mb-3 text-gray-500">
            Перше фото буде на обкладинці оголошення.
          </p>
          <div className="flex flex-wrap">
            {imgFiles.map((f, ind) => (
              <ImgUpload
                className="mr-2 mt-2"
                key={f.name}
                file={f}
                onChange={changeFileHandler.bind(null, ind)}
                onDelete={removeFileHandler.bind(null, f)}
              />
            ))}
            <ImgUpload
              className="mt-2"
              onChange={addFileHandler}
              clearOnChange={true}
            />
          </div>
          <label className="text-xl block font-medium text-teal-900 mt-5">
            Додати декілька
          </label>
          <input
            className="mt-2"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={addMultipleFilesHandler}
            multiple
          />
        </div>
      </Card>
      {/* Tags */}
      <Card className="mt-5">
        <div>
          <h2 className="font-bold text-2xl">Теги</h2>
          <p className="text-lg mt-1 mb-3 text-gray-500">
            Ключові слова, що характеризують ваш предмет
          </p>
          {tags.length > 0 && (
            <div className="px-4 mb-2 py-2 rounded border border-solid border-gray-300 flex flex-wrap">
              {tags.map((tg) => (
                <div
                  key={tg}
                  className="w-fit bg-gray-100 text-gray-600 px-2 py-1 rounded flex font-semibold items-center text-sm mr-2">
                  <span className="mr-1">{tg}</span>
                  <GrFormClose
                    className="scale-125 cursor-pointer"
                    onClick={() => removeTagHandler(tg)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end">
            <Input
              label="Новий тег"
              placeholder="Приклад: б/у"
              value={newTagValue}
              onChange={newTagChangeHandler}
            />
            <Button
              color="success"
              className="w-18 !h-10 ml-3"
              onClick={addTagHandler}>
              Додати
            </Button>
          </div>
        </div>
      </Card>
      {/* Description */}
      <Card className="mt-5">
        <div>
          <h2 className="font-bold text-2xl">Опис</h2>
          <textarea
            ref={descRef}
            required={true}
            className="rounded-lg h-40 w-full bg-gray-50 border border-solid h-10 px-2 mt-2 border-teal-900 mt-2"
            placeholder="Придумайте, що ви хотіли би дізнатися з оголошення та додайте це в опис"
          />
        </div>
      </Card>
      {/* Name and category */}
      <Card className="mt-5">
        <div>
          <h2 className="font-bold text-2xl mb-3">Де знаходиться предмет?</h2>
          <Input
            label="Населений пункт"
            placeholder="Київ"
            value={locationValue}
            hasError={locationHasError}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            required={true}
          />
          {locationHasError && (
            <span className="block text-red-800">
              Населений пункт не може бути пустим
            </span>
          )}
        </div>
      </Card>
      {/* Actions */}
      <Card className="mt-5">
        <Button type="Submit" color="success" className="w-fit">
          Опублікувати
        </Button>
      </Card>
    </form>
  );
};

export default CreateProduct;
