const { createContext, useState, useContext, useReducer } = require("react");

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const getItem = (cart, product) => {
    return cart.find((item) => item.id === product.id);
};

const cartReducer = (state, action) => {
    const { product, type } = action;
    const item = getItem(state, product)
    console.log(product);

    if (type === "add") {
        return item
            ? state.map((cartItem) =>
                cartItem.id == product.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
            : [...state, { ...product, quantity: 1 }];
    }

    if (type === "remove") {
        return item.quantity === 1
            ? state.filter((cartItem) => cartItem.id !== product.id)
            : state.map((cartItem) =>
                cartItem.id === product.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
    }

    if (type === "delete") {
        return state.filter((cartItem) => cartItem.id !== product.id);
    }

    return state;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useReducer(cartReducer, []);
    return (
        <CartDispatchContext.Provider value={setCart}>
            <CartStateContext.Provider value={cart}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useDispatchCart = () => useContext(CartDispatchContext);
export const useCart = () => useContext(CartStateContext);