import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import ProductBrief from "../../Product/ProductBrief";
import axios from "../../../config/axios";
import { getCookie } from "../../../utils/cookie";

const OfferForm = (props) => {
  const currentUserId = useSelector((state) => state.auth.user._id);

  const [showAddWanted, setShowAddWanted] = useState(false);
  const [possibleWantedProducts, setPossibleWantedProducts] = useState([]);
  const [wantedProducts, setWantedProducts] = useState([]);

  const [showAddOffered, setShowAddOffered] = useState(false);
  const [possibleOfferedProducts, setPossibleOfferedProducts] = useState([]);
  const [offeredProducts, setOfferedProducts] = useState([]);

  useEffect(() => {
    setWantedProducts([]);
    axios
      .get(`api/products?owner=${props.ownerId}&pagination=false`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        setPossibleWantedProducts(
          res.data.products.filter((prod) => prod._id !== props.item._id)
        );
      });
  }, [props.ownerId, props.item._id]);

  useEffect(() => {
    setPossibleOfferedProducts([]);
    axios
      .get(`api/products?owner=${currentUserId}&pagination=false`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        setPossibleOfferedProducts(res.data.products);
      });
  }, [currentUserId]);

  const addToWantedHandler = (product) => {
    setWantedProducts((prev) => [...prev, product]);
    setPossibleWantedProducts((prev) =>
      prev.filter((prod) => prod._id !== product._id)
    );
  };

  const removeWantedHandler = (product) => {
    setWantedProducts((prev) =>
      prev.filter((prod) => prod._id !== product._id)
    );
    setPossibleWantedProducts((prev) => [...prev, product]);
  };

  const showAddWantedHandler = () => {
    setShowAddWanted(true);
  };

  const hideAddWantedHandler = () => {
    setShowAddWanted(false);
  };

  const addToOfferedHandler = (product) => {
    setOfferedProducts((prev) => [...prev, product]);
    setPossibleOfferedProducts((prev) =>
      prev.filter((prod) => prod._id !== product._id)
    );
  };

  const removeOfferedHandler = (product) => {
    setOfferedProducts((prev) =>
      prev.filter((prod) => prod._id !== product._id)
    );
    setPossibleOfferedProducts((prev) => [...prev, product]);
  };

  const showAddOfferedHandler = () => {
    setShowAddOffered(true);
  };

  const hideAddOfferedHandler = () => {
    setShowAddOffered(false);
  };

  const onSendHandler = () => {
    axios
      .post(
        "/api/offers",
        {
          to: {
            user: props.ownerId,
            products: [
              props.item._id,
              ...wantedProducts.map((prod) => prod._id),
            ],
          },
          products: offeredProducts.map((prod) => prod._id),
        },
        {
          headers: {
            "x-auth-token": getCookie("x-auth-token"),
          },
        }
      )
      .then(() => {
        props.onClose();
      });
  };

  return (
    <Modal
      className="border-0 max-h-5/6 overflow-y-scroll"
      show={props.show}
      onClose={props.onClose}>
      <Modal.Header className="text-2xl">Запропонувати обмін</Modal.Header>
      <div className="p-5">
        <h3 className="text-teal-900 font-bold text-xl mb-2">Бажані товари</h3>
        <div className="max-h-56 pb-2 scroll overflow-y-scroll">
          <ProductBrief product={props.item} />
          {wantedProducts.map((prod) => (
            <ProductBrief
              className="mt-2"
              key={prod._id}
              product={prod}
              onClose={removeWantedHandler.bind(null, prod)}
            />
          ))}
        </div>
        {showAddWanted && (
          <>
            <div className="bg-gray-200 p-3 rounded mt-3">
              <h3 className="font-medium text-teal-900">
                Оберіть додаткові товари
              </h3>
              <div className="max-h-36 pb-2 scroll overflow-y-scroll">
                {possibleWantedProducts.map((prod) => (
                  <ProductBrief
                    className="mt-2 hover:bg-green-50 cursor-pointer"
                    key={prod._id}
                    product={prod}
                    onClick={addToWantedHandler.bind(null, prod)}
                  />
                ))}
                {possibleWantedProducts.length === 0 && (
                  <h3>У користувача більше немає товарів</h3>
                )}
              </div>
            </div>
            <Button color="red" className="mt-2" onClick={hideAddWantedHandler}>
              Скасувати
            </Button>
          </>
        )}
        {!showAddWanted && (
          <Button
            color="success"
            className="mt-2"
            onClick={showAddWantedHandler}>
            Додати
          </Button>
        )}
        {/* Your products */}
        <h3 className="text-teal-900 font-bold text-xl mt-5 mb-2">
          Пропоновані товари
        </h3>
        <div className="max-h-56 pb-2 scroll overflow-y-scroll">
          {offeredProducts.length === 0 && (
            <p>Додайте товари, які ви готові запропонувати</p>
          )}
          {offeredProducts.map((prod) => (
            <ProductBrief
              className="mt-2"
              key={prod._id}
              product={prod}
              onClose={removeOfferedHandler.bind(null, prod)}
            />
          ))}
        </div>
        {showAddOffered && (
          <>
            <div className="bg-gray-200 p-3 rounded mt-3">
              <h3 className="font-medium text-teal-900">Оберіть товари</h3>
              <div className="max-h-36 pb-2 scroll overflow-y-scroll">
                {possibleOfferedProducts.map((prod) => (
                  <ProductBrief
                    className="mt-2 hover:bg-green-50 cursor-pointer"
                    key={prod._id}
                    product={prod}
                    onClick={addToOfferedHandler.bind(null, prod)}
                  />
                ))}
                {possibleOfferedProducts.length === 0 && (
                  <h3>У Вас більше немає товарів</h3>
                )}
              </div>
            </div>
            <Button
              color="red"
              className="mt-2"
              onClick={hideAddOfferedHandler}>
              Скасувати
            </Button>
          </>
        )}
        {!showAddOffered && (
          <Button
            color="success"
            className="mt-2"
            onClick={showAddOfferedHandler}>
            Додати
          </Button>
        )}
      </div>
      <Modal.Footer>
        <Button
          disabled={offeredProducts.length === 0}
          color="success"
          onClick={onSendHandler}>
          Надіслати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OfferForm;
