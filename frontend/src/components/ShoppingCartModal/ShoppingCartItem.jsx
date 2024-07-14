import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ShoppingCartItem({ item }) {

    return (
        <>
        <div className="cartItem">
            <div id="itemImage" className="itemEl"><img src={item.image} width={50} height={50} alt="item image" /></div>
            <div id="itemName-size" className="itemEl"><span>{item.name}</span></div>
            <div id="itemPrice" className="itemEl"><span>${item.price}</span></div>
            <div id="itemQuantity" className="itemEl"><span>{item.quantity}</span></div>
        </div>
        </>    
    )
}

export default ShoppingCartItem;