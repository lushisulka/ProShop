export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}


export const updateCart = (state) => {
    // Calculate item price
    state.itemPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate shipping price (If order is over $100 then free, else $10 shipping)
    state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10);

    // Calculate tax price (15% tax)
    state.taxPrice = addDecimal(Number((0.15 * state.itemPrice).toFixed(2)));

    // Calculate total price
    state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);


    localStorage.setItem("cart", JSON.stringify(state));

    return state;
}