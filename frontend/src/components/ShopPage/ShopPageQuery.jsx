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
            if (data && data.errors){}
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
            if (data && data.errors) {}
        })
    }, [location])



    return (
        <div id='body'>
            <div id='shop-page-query'>
                <div>
                </div>
                <div id='item-grid'>
                    {items && items.length > 0 &&
                        <>
                            {items?.map((item) => {
                                return (
                                    <ShopPageItem key={item.id} item={item} />
                                )
                            })}
                        </>
                    } {items && !items.length && <div id='no-results'><h2>No results</h2></div>}
                </div>
            </div>
        </div>
    )
}

export default ShopPageQuery;