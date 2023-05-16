import axios from "../config/axios";
import { getCookie } from "../utils/cookie";
import { authActions } from "./auth-slice";

export const changeFavorites = (productId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const favs = await axios.patch(`api/users/favorite/${productId}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      });

      return favs.data.favorites;
    };

    try {
      const favs = await sendRequest();

      dispatch(authActions.setFavorites(favs));
    } catch (e) {
      console.log(e);
    }
  };
};
