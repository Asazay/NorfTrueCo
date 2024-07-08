import { NavLink } from "react-router-dom";

const ShopPageItem = ({item}) => {

    return (
        <div id={item.id} className="itemTile">
           <NavLink to={`/shop/products/${item.id}`}>
           <div>
           <div id="imgDiv"><img src={item.image} alt="Item image"></img></div>
            <div id='nameDiv'>{item.name}</div>
            <div id="priceDiv">${item.price}</div>
           </div>
           </NavLink>
        </div>
    )
}

export default ShopPageItem;