import React, { useReducer, useState, useEffect } from "react";
import {
  initialState,
  reducer,
  USER_DATA_STATE_CHANGED,
} from "./authReducer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/authActions";
import { getCart } from "../redux/actions/authActions";

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const dispatch = useDispatch()
  const lineItem = useSelector(state => state.user);
  const lineItems = useSelector(state => state.user.cartLineItems);
  // let line_items = 0

  const [authState, dispatchReducer] = useReducer(reducer, initialState);
  const [cartCount, setCartCount] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)

  const actions = {
    userDataStateChanged: (user) => {
      dispatchReducer({ type: USER_DATA_STATE_CHANGED, payload: user });
    },
  };

  useEffect(() => {
    // if (!lineItems)
      // dispatch(getCart())
  }, [cartCount])

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (lineItem) {
        if (lineItem.success) {
          setCartCount(cartCount + 1)
        } else {
          setCartCount(cartCount)
        }
      }
    }
  }, [lineItem])

  useEffect(() => {
    if (lineItems && Array.isArray(lineItems))
      setCartCount(lineItems.length)
      setTotalPrice(lineItems?.length)
  }, [lineItems])

  const handleAddToCart = (itemableId, itemableType) => {
    dispatch(addToCart(itemableId, itemableType))
  }

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        authActions: actions,
        handleAddToCart: handleAddToCart,
        cartCount: cartCount,
        totalCartPrice: totalPrice
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
