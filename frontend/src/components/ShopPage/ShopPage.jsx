import './ShopPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsThunk } from '../../redux/session';
import ShopPageItem from './ShopPageItem';

function ShopPage() {
    const items = useSelector(state => state.session.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsThunk()).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        })
    }, [dispatch])

    return (
        <div id='body'>
            <div id='shop-page'>
                <div>
                    <div id='filter-form'>
                        <fieldset>
                            <legend>Filter:</legend>
                            <div>
                                Gender:<br />
                                <input id='male' type='radio' value='male' />
                                <label for='male'>Men</label>
                            </div>
                            <div>
                                <input id='female' type='radio' value='female' />
                                <label for='male'>Women</label>
                            </div>
                            <br />
                            <div>
                                Size:<br />
                                <input type='checkbox' id='small' value='small' />
                                <label for='small'>Small</label>
                            </div>
                            <div>
                                <input type='checkbox' id='medium' value='medium' />
                                <label for='medium'>Medium</label>
                            </div>
                            <div>
                                <input type='checkbox' id='large' value='large' />
                                <label for='large'>Large</label>
                            </div>
                            <div>
                                <input type='checkbox' id='xl' value='xl' />
                                <label for='xl'>XL</label>
                            </div>
                            <div>
                                <input type='checkbox' id='xxl' value='xxl' />
                                <label for='xxl'>XXL</label>
                            </div>
                            <div>
                                <input type='checkbox' id='3xl' value='3xl' />
                                <label for='3xl'>3XL</label>
                            </div>
                            <br />
                            <div>
                                Color:<br />
                                <input type='text' value='' id='filterColor'></input>
                                <label for='filterColor'></label>
                            </div>
                            <br />
                            <div>
                                Min Price(USD):<br />
                                <label for='minPrice'></label>
                                <input type='number' id='minPrice' />
                            </div>
                            <br />
                            <div>
                                Max Price(USD):<br />
                                <label for='maxPrice'></label>
                                <input type='number' id='maxPrice' />
                            </div>
                            <br />
                            <div>
                                Category:<br />
                                <div>
                                    <input type='checkbox' id='hats' value='hats' />
                                    <label for='hats'>Hats</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shirts' value='shirts' />
                                    <label for='shirts'>Shirts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='hoodies' value='hoodies' />
                                    <label for='large'>Hoodies</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='pants' value='pants' />
                                    <label for='pants'>Pants</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shorts' value='shorts' />
                                    <label for='shorts'>Shorts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='socks' value='socks' />
                                    <label for='socks'>Socks</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='accessories' value='accessories' />
                                    <label for='accessories'>Accssories</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id='item-grid'>
                    {items &&
                        <>
                            {items?.map(item => {
                                return (
                                    <ShopPageItem key={item.id} item={item} />
                                )
                            })}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ShopPage;