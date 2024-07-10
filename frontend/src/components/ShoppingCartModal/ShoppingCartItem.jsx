import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ShoppingCartItem({ item }) {

    return (
        <div className="cartItem">
            <div id="itemImage"><img src={item.image} alt="A item image" /></div>
            <div id="itemName-size"><span>{item.name}</span></div>
            <div id="itemPrice"><span>{item.price}</span></div>
            <div id="itemQuantity"><span>{item.quantity}</span></div>
        </div>
    )
}

export default ShoppingCartItem;