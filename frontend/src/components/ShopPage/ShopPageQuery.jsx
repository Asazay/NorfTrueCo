import './ShopPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsThunk, getFilteredItemsThunk } from '../../redux/session';
import ShopPageItem from './ShopPageItem';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ShopPageQuery() {
    const items = useSelector(state => state.session.items);
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

        let searchQuery = {}
        if (window.location.href.includes('?')) {
            const currUrl = window.location.href;
            let params = currUrl.split('?')[1]
            if (params.includes('&')) {
                let getKeysVals = params.split('&')

                getKeysVals.forEach(keyVal => {
                    const [key, val] = keyVal.split('=')
                    searchQuery[key] = val;
                })
            }
            else {
                const [key, val] = params.split('=')
                searchQuery[key] = val;
            }
        }

        const filterStr = new URLSearchParams(searchQuery).toString();

        dispatch(getFilteredItemsThunk(filterStr)).catch(async res => {
            const data = res.json();
            if (data && data.errors) { }
        })
    }, [dispatch])

    useEffect(() => {
        let searchQuery = {}
        if (window.location.href.includes('?')) {
            const currUrl = window.location.href;
            let params = currUrl.split('?')[1]
            if (params.includes('&')) {
                let getKeysVals = params.split('&')

                getKeysVals.forEach(keyVal => {
                    const [key, val] = keyVal.split('=')
                    searchQuery[key] = val;
                })
            }
            else {
                const [key, val] = params.split('=')
                searchQuery[key] = val;
            }
        }

        const filterStr = new URLSearchParams(searchQuery).toString();

        dispatch(getFilteredItemsThunk(filterStr)).catch(async res => {
            const data = res.json();
            if (data && data.errors) { }
        })
    }, [location])



    return (
        <div id='body'>
            {items && !items.length &&
                <div id='no-results'>
                    <div>
                        <button onClick={() => navigate('/')}>Home</button>
                        <button onClick={() => navigate('/shop/products')}>Shop All</button>
                    </div>
                    <h2>No results</h2>
                </div>}
            <div id='shop-page-query'>
                <div id='item-grid'>
                    {items && items.length > 0 &&
                        <>
                            {items?.map((item) => {
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

export default ShopPageQuery;