import { NavLink } from "react-router-dom";

const ShopPageItem = ({item}) => {

    return (
        <div id={item.id} className="itemTile">
            <span>{item.name}</span>
           <NavLink to={`/shop/products/${item.id}`}>
           <div>
            <div>{item.name}</div>
            <div>{item.price}</div>
           </div>
           </NavLink>
        </div>
    )
}

export default ShopPageItem;