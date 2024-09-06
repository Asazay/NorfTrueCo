import './ShopPage.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsThunk, getFilteredItemsThunk } from '../../redux/session';
import ShopPageItem from './ShopPageItem';
import { useNavigate } from 'react-router-dom';


function ShopPage() {
    const items = useSelector(state => state.session.items);
    const dispatch = useDispatch();

    const [gender, setGender] = useState('');
    const [sizes, setSizes] = useState({});
    const [color, setColor] = useState('')
    const [colors, setColors] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [lockFilter, setLockFilter] = useState(false)
    const [categories, setCategories] = useState({});

    const initialCheckedVal = {
        hats: false,
        shirts: false,
        hoodies: false,
        pants: false,
        shorts: false,
        socks: false,
        accessories: false,
        small: false,
        medium: false,
        large: false,
        xl: false,
        xxl: false,
        "3xl": false,
        universal: false,
    }
    const [checked, setChecked] = useState(initialCheckedVal)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const filterSubmit = (e = null) => {
        if (e) e.preventDefault();
        const queryObj = {}
        if (gender) queryObj['gender'] = gender;
        if (Object.values(sizes).length > 0) queryObj.itemSize = Object.values(sizes);
        if (Object.values(colors).length > 0) queryObj.color = Object.values(colors);
        if (minPrice) queryObj.minPrice = minPrice;
        if (maxPrice) queryObj.maxPrice = maxPrice;
        if (Object.values(categories).length > 0) queryObj.category = Object.values(categories);

        const filterQuery = new URLSearchParams(queryObj).toString();

        navigate('/shop/products/?' + filterQuery)
        dispatch(getFilteredItemsThunk(filterQuery)).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        })
    }

    const resetFilter = (e) => {
        e.preventDefault()
        setCategories({});
        setColor("");
        setColors({});
        setGender("");
        setMaxPrice("");
        setMinPrice("");
        setSizes({})
        setChecked(initialCheckedVal)
        setErrors({})
        document.getElementById('male').checked = false;
        document.getElementById('female').checked = false;
        dispatch(getItemsThunk()).catch(async res => {
            const data = res.json();
            if (data && data.errors) { }
        })
    }

    const customSetSizes = (e) => {
        let newSizes = { ...sizes };
        const newChecked = { ...checked }

        if (newSizes[e.target.value] && !newChecked[e.target.id] === false) {
            delete newSizes[e.target.value]
            newChecked[e.target.id] = !newChecked[e.target.id]
        }

        else {
            newSizes[e.target.value] = e.target.value;
            if (newChecked[e.target.id] === false) newChecked[e.target.id] = true
        }
        setSizes(newSizes)
        setChecked(newChecked)
    }

    const customSetCategories = (e) => {
        const val = e.target.value;
        const newChecked = { ...checked }

        let newCategories = { ...categories };

        if (newCategories[val] && !newChecked[e.target.id] === false) {
            delete newCategories[val]
            newChecked[e.target.id] = !newChecked[e.target.id]
        }

        else {
            newCategories[val] = val;
            if (newChecked[e.target.id] === false) newChecked[e.target.id] = true
        }
        setCategories(newCategories)
        setChecked(newChecked)

    }

    const AddColor = (e) => {
        let newColors = { ...colors }
        let color = document.getElementById('filterColor').value;
        color = color.toLowerCase()
        if (!color) setErrors({ ...errors, color: "Color field cannot be blank" })
        else if (newColors[color]) setErrors({ ...errors, color: 'Color already added' })
        else {
            newColors[color] = color;
            setColors(newColors)
        }
    }

    const removeColor = (e) => {
        let newColors = { ...colors }
        let color = e.target.value;
        if (!newColors[color.toLowerCase()]) setErrors({ ...errors, color: "Color isn't added" })
        else {
            delete newColors[color.toLowerCase()]
            setColors(newColors)
        }
    }

    useEffect(() => {
        if (window.location.href.includes('?')) {
            navigate('/shop/products/')
        }
        else {
            dispatch(getItemsThunk()).catch(async res => {
                const data = res.json();
                if (data && data.errors) { }
            })
        }
    }, [dispatch])


    // useEffect(() => {
    // }, [gender, sizes, colors, minPrice, maxPrice, categories])

    return (
        <div id='body'>
            <div id='shop-page'>
                <div>
                    <div id='filter-form'>
                        <fieldset>
                            <legend></legend>
                            <div>
                                Gender:<br />
                                <input name='gender' id='male' type='radio' value='men' onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor='male'>Men</label>
                            </div>
                            <div>
                                <input name='gender' id='female' type='radio' value='women' onChange={(e) => setGender(e.target.value)} />
                                <label htmlFor='male'>Women</label>
                            </div>
                            <br />
                            <div>
                                Size:<br />
                                <input name='size' type='checkbox' id='small' value='small' checked={checked['small']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='small'>Small</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='medium' value='medium' checked={checked['medium']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='medium'>Medium</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='large' value='large' checked={checked['large']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='large'>Large</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='xl' value='xl' checked={checked['xl']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='xl'>XL</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='xxl' value='xxl' checked={checked['xxl']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='xxl'>XXL</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='3xl' value='3xl' checked={checked['3xl']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='3xl'>3XL</label>
                            </div>
                            <div>
                                <input name='size' type='checkbox' id='universal' value='universal' checked={checked['universal']} onChange={e => customSetSizes(e)} />
                                <label htmlFor='universal'>Universal</label>
                            </div>
                            <br />
                            <div id='colorFilter'>
                                {errors && errors.color && <p>{errors.color}</p>}
                                Color:<br />
                                <input type='text' value={color} id='filterColor' onChange={e => { setColor(e.target.value); setErrors({}) }}></input>
                                <label htmlFor='filterColor'></label>
                                <div style={{ display: 'flex' }}>
                                    <button onClick={(e) => AddColor(e)}>Add Color</button>
                                    {/* <button onClick={(e) => removeColor(e)}>Remove color</button> */}
                                </div>
                                {colors && Object.values(colors).length > 0 && <div id='colorsArray'><small style={{color: 'red'}}>* uncheck color to remove</small><ul>{Object.values(colors)
                                    .map((color, i) => (
                                        <li key={'li' + (i + 1)}>
                                            <label>{color}
                                                <input type='checkbox' value={color} onChange={e => removeColor(e)} checked/>
                                            </label>
                                        </li>
                                    )
                                    )}</ul></div>}
                            </div>
                            <br />
                            <div>
                                Min Price(USD):<br />
                                <label htmlFor='minPrice'></label>
                                {errors && errors.minPrice && <p>{errors.minPrice}</p>}
                                <input type='number' id='minPrice' value={minPrice} onChange={e => {
                                    if(e.target.value < 0 || e.target.value > 1000){
                                        let newErrs = {...errors};
                                        newErrs['minPrice'] = 'Min price must be between 0 and 1000'
                                    }
                                    else {
                                        setMinPrice(e.target.value)
                                        let newErrs = {...errors}
                                        if(newErrs.minPrice) delete newErrs.minPrice
                                        setErrors(newErrs)
                                    }
                                }} />
                            </div>
                            <br />
                            <div>
                                Max Price(USD):<br />
                                <label htmlFor='maxPrice'></label>
                                <input type='number' id='maxPrice' value={maxPrice} onChange={e => {
                                     if(e.target.value < 0 || e.target.value > 1000){
                                        let newErrs = {...errors};
                                        newErrs['maxPrice'] = 'Max price must be between 0 and 1000'
                                    }
                                    else {
                                        setMaxPrice(e.target.value)
                                        let newErrs = {...errors}
                                        if(newErrs.maxPrice) delete newErrs.maxPrice
                                        setErrors(newErrs)
                                    }
                                }} />
                            </div>
                            <br />
                            <div>
                                Category:<br />
                                <div>
                                    <input type='checkbox' id='hats' value='hats' checked={checked['hats']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='hats'>Hats</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shirts' value='shirts' checked={checked['shirts']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='shirts'>Shirts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='hoodies' value='hoodies' checked={checked['hoodies']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='large'>Hoodies</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='pants' value='pants' checked={checked['pants']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='pants'>Pants</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='shorts' value='shorts' checked={checked['shorts']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='shorts'>Shorts</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='socks' value='socks' checked={checked['socks']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='socks'>Socks</label>
                                </div>
                                <div>
                                    <input type='checkbox' id='accessories' value='accessories' checked={checked['accessories']} onChange={e => customSetCategories(e)} />
                                    <label htmlFor='accessories'>Accssories</label>
                                </div>
                            </div>
                            <div id='filterBtnDiv' style={{padding: '5px 0'}}>
                                <button disabled={minPrice < 0 || maxPrice < 0 || Object.keys(errors).length ? true : false} onClick={(e) => filterSubmit(e)}>Apply Filter</button>
                                <button onClick={e => resetFilter(e)}>Reset</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
               { items && items.length > 0 && <div id='item-grid'>
                    {items && items.length > 0 &&
                        <>
                            {items?.map((item) => {
                                return (
                                    <ShopPageItem key={item.id} item={item} />
                                )
                            })}
                        </>
                    }
                </div>}
                {items && !items.length && <div id='no-results'><h2>No results</h2></div>}
            </div>
        </div>
    )
}

export default ShopPage;