import { NavLink } from "react-router-dom";
import ItemModal from '../ItemModal/ItemModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

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
           <div id='selectOptsDiv'><OpenModalButton item={item} itemText={'Select Options'} modalComponent={ItemModal}/></div>
        </div>
    )
}

export default ShopPageItem;