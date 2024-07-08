import './ShopPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsThunk } from '../../redux/session';
import ShopPageItem from './ShopPageItem';
import { createPath } from 'react-router-dom';

function ShopPage() {
    const items = useSelector(state => state.session.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItemsThunk()).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        })
    }, [dispatch])

    const [gender, setGender] = useState('');
    const [sizes, setSizes] = useState({});
    const [color, setColor] = useState('')
    const [colors, setColors] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({})

    const customSetSizes = (e) => {
        console.log(document.getElementById('filterColor').value)
        let newSizes = {...sizes};
        if (newSizes[e.target.value]) {
            delete newSizes[e.target.value]
        }

        else newSizes[e.target.value] = e.target.value;
        setSizes(newSizes)
    }

    const AddColor = (e) => {
        let newColors = {...colors}
        let color = document.getElementById('filterColor').value;
        if(!color) setErrors({...errors, color: "Color field cannot be blank"})
        else if (newColors[color]) setErrors({ ...errors, color: 'Color already added' })
        else {
            newColors[color] = color
            setColors(newColors)
        }
    }

    const removeColor = (e) => {
        let newColors = {...colors}
        let color = document.getElementById('filterColor').value;
        if(!newColors[color]) setErrors({...errors, color: "Color isn't added"})
        else {
            delete newColors[color]
            setColors(newColors)
        }
    }

    useEffect(() => {
        console.log(gender, sizes, colors)
    }, [gender, sizes, colors])

    return (
        <div id='body'>
            <div id='shop-page'>
                <div>
                    <div id='filter-form'>
                        <fieldset>
                            <legend>Filter:</legend>
                            <div>
                                Gender:<br />
                                <input name='gender' id='male' type='radio' value='male' onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor='male'>Men</label>
                            </div>
                            <div>
                                <input name='gender' id='female' type='radio' value='female' onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor='male'>Women</label>
                            </div>
                            <br />
                            <div>
                                Size:<br />
                                <input name='size' type='checkbox' id='small' value='small' onChange={e => customSetSizes(e)} />
                                <label htmlFor='small'>Small</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='medium' value='medium' onChange={e => customSetSizes(e)} />
                                <label htmlFor='medium'>Medium</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='large' value='large' onChange={e => customSetSizes(e)} />
                                <label htmlFor='large'>Large</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='xl' value='xl' onChange={e => customSetSizes(e)} />
                                <label htmlFor='xl'>XL</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='xxl' value='xxl' onChange={e => customSetSizes(e)} />
                                <label htmlFor='xxl'>XXL</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='3xl' value='3xl' onChange={e => customSetSizes(e)} />
                                <label htmlFor='3xl'>3XL</label>
                            </div>
                            <br />
                            <div id='colorFilter'>
                                {errors && errors.color && <p>{errors.color}</p>}
                                Color:<br />
                                <input type='text' value={color} id='filterColor' onChange={e => {setColor(e.target.value); setErrors({})}}></input>
                                <label htmlFor='filterColor'></label>
                                <button onClick={(e) => AddColor(e)}>Add Color</button>
                                <button onClick={(e) => removeColor(e)}>Remove color</button>
                                {colors && Object.values(colors).length > 0 && <div id='colorsArray'>[{Object.values(colors).map((color, i) => (<span key={i}>{color}, </span>))}]</div>}
                            </div>
                            <br />
                            <div>
                                Min Price(USD):<br />
                                <label htmlFor='minPrice'></label>
                                <input type='number' id='minPrice' />
                            </div>
                            <br />
                            <div>
                                Max Price(USD):<br />
                                <label htmlFor='maxPrice'></label>
                                <input type='number' id='maxPrice' />
                            </div>
                            <br />
                            <div>
                                Category:<br />
                                <div>
                                    <input type='checkbox' id='hats' value='hats' />
                                    <label htmlFor='hats'>Hats</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shirts' value='shirts' />
                                    <label htmlFor='shirts'>Shirts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='hoodies' value='hoodies' />
                                    <label htmlFor='large'>Hoodies</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='pants' value='pants' />
                                    <label htmlFor='pants'>Pants</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shorts' value='shorts' />
                                    <label htmlFor='shorts'>Shorts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='socks' value='socks' />
                                    <label htmlFor='socks'>Socks</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='accessories' value='accessories' />
                                    <label htmlFor='accessories'>Accssories</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id='item-grid'>
                    {items &&
                        <>
                            {items?.map((item )=> {
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