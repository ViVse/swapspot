import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const ImgUpload = (props) => {
  const [src, setSrc] = useState(
    props.file ? URL.createObjectURL(props.file) : ""
  );
  const inputRef = useRef();

  const selectHandler = (e) => {
    inputRef.current.click();
  };

  const changeImgHandler = () => {
    setSrc(URL.createObjectURL(inputRef.current.files[0]));
    props.onChange(inputRef.current.files[0]);
    if (props.clearOnChange) setSrc(null);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    props.onDelete();
  };

  return (
    <>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={changeImgHandler}
      />
      <div
        className={`${props.className} w-48 h-48 border border-solid border-green-400 relative flex items-center justify-center bg-green-300 font-bold underline text-teal-900`}
        onClick={selectHandler}>
        {!src && <p className="cursor-pointer">Додати фото</p>}
        {src && (
          <>
            <img
              className="w-full h-full object-cover"
              src={src}
              alt="picked img"
            />
            <AiFillDelete
              className="absolute top-2 right-2 !fill-red-600 scale-150"
              onClick={deleteHandler}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImgUpload;
