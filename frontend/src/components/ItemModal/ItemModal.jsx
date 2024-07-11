import './ItemModal.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/modal";

function ItemModal(item = null, items = null){
    // const [color, setColor] = useState('')
    // const [size, setSize] = useState('')
    // const [amount, setAmount] = useState(1)
    // const [available, setAvailable] = useState(true)
    // const [colors, setColors] = useState([])

    // useEffect(() => {
    //     items.forEach(el => {
    //         if(el.name === item.name) setColors(colors + [el.color])
    //     })
    // }, [items])

    return(
        <div id='item-modal'>
            <div>
                <img src={item.image} alt='image' width={250} height={250}/>
            </div>
            <div>
                <div><p>{item.name}</p></div>
                <div>
                    <label for='color'>Color :</label>
                    <span name='color'>{item.color}</span>
                </div>
                <div>
                    <label for='size'>Size: </label>
                    <select name='sizes' id='sizes'>
                        <option value='small'>SMALL</option>
                        <option value='medium'>MEDIUM</option>
                        <option value='large'>LARGE</option>
                        <option value='xl'>XL</option>
                        <option value='xxl'>XXL</option>
                        <option value='3xl'>3XL</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ItemModal;