import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"


export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {

        case CART_ADD_ITEM:
            const currItem = action.payload

            // check the id of product to see if it already exists
            const existingItem = state.cartItems.find(c => c.product === currItem.product)

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(c => c.product === existingItem.product ? currItem : c)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, currItem]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(c => c.product !== action.payload)
            }

        default:
            return state
    }
}