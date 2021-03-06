import {
  GET_ITEMS,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_ORDERS,
  DELETE_ORDER,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../types";

const initialState = {
  items: null,
  orders: null,
  cart: [],
  total: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case CREATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case EDIT_ITEM:
      let index_to_update = state.items.findIndex(
        (item) => item.itemId === action.payload.itemId
      );
      state.items[index_to_update] = action.payload;
      return {
        ...state,
      };
    case DELETE_ITEM:
      let index_to_delete = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      state.items.splice(index_to_delete, 1);
      return {
        ...state,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case DELETE_ORDER:
      let order_index = state.orders.findIndex(
        (order) => order.orderID === action.payload
      );
      state.orders.splice(order_index, 1);
      return {
        ...state,
      };

    case ADD_TO_CART:
      let itemOrder = {};

      let itemIndex = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      let found = false;
      state.cart.forEach((cartItem) => {
        if (cartItem.name === state.items[itemIndex].name) {
          cartItem.quantity += 1;
          found = true;
        }
      });
      if (!found) {
        itemOrder.itemId = state.items[itemIndex].itemId;
        itemOrder.name = state.items[itemIndex].name;
        itemOrder.price = state.items[itemIndex].price;
        itemOrder.quantity = 1;
        state.cart.push(itemOrder);
      }
      state.total += parseInt(state.items[itemIndex].price, 10);
      return {
        ...state,
      };

    case REMOVE_FROM_CART:
      state.cart.forEach((cartItem) => {
        if (cartItem.itemId === action.payload) {
          cartItem.quantity -= 1;
          state.total -= cartItem.price;
        }
      });
      // Check if any item quantities reached 0
      state.cart.forEach((cartItem, index) => {
        if (cartItem.quantity === 0) {
          state.cart.splice(index, 1);
        }
      });
      return {
        ...state,
      };

    default:
      return state;
  }
}
