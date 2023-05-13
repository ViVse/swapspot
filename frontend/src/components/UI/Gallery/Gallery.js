import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./Gallery.module.scss";

const Gallery = (props) => {
  const [selectedImg, setSelectedImg] = useState(props.imgs[0]);
  const selectedImgIndex = props.imgs.findIndex((img) => img === selectedImg);

  const changeImgHandler = (e) => {
    setSelectedImg(e.target.src);
  };

  const nextImgHandler = () => {
    const nextIndx =
      selectedImgIndex === props.imgs.length - 1 ? 0 : selectedImgIndex + 1;
    setSelectedImg(props.imgs[nextIndx]);
  };

  const previousImgHandler = () => {
    const nextIndx =
      selectedImgIndex === 0 ? props.imgs.length - 1 : selectedImgIndex - 1;
    setSelectedImg(props.imgs[nextIndx]);
  };

  return (
    <div className={`${styles.gallery} ${props.className}`}>
      <div className="relative">
        <img
          className={`h-auto max-w-full rounded-lg ${styles.titleImg}`}
          src={
            selectedImg ||
            "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
          }
          alt=""
        />
        {props.imgs.length > 0 && (
          <>
            <span className={`${styles.badge} text-sm font-semibold`}>
              {selectedImgIndex + 1} of {props.imgs.length}
            </span>
            <IoIosArrowBack
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={previousImgHandler}
            />
            <IoIosArrowBack
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={nextImgHandler}
            />
          </>
        )}
      </div>
      <div className={`flex mt-2 overflow-x-scroll ${styles.imgs}`}>
        {props.imgs.map((imgUrl) => (
          <div key={imgUrl} className="shrink-0">
            <img
              className="h-24 mr-2 w-24 rounded-lg object-cover"
              src={imgUrl}
              alt=""
              onClick={changeImgHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Gallery };
