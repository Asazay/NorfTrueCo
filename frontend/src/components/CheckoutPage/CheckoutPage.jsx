import './Checkout.css'
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../redux/session';

function CheckoutPage() {
    window.history.replaceState(null, "", '/')
    const [cart, setCart] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [payFirstName, setPayFirstName] = useState('');
    const [payLastName, setPayLastName] = useState('')
    const [billAddress, setBillAddress] = useState('');
    const [billCity, setBillCity] = useState('');
    const [billState, setBillState] = useState('');
    const [billZipCode, setBillZipCode] = useState('');
    const [shipAddress, setShipAddress] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipState, setShipState] = useState('');
    const [shipZipCode, setShipZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [salesTax, setSalesTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [errors, setErrors] = useState({});
    const [sameShip, setSameShip] = useState(false)

    const shipping = 5.99;

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
        "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ]

    const stateSalesTax = [
        .04, 0, .0560, .0650, .06, .0290, .0635, 0, .06, .04, .04, .06,
        .0625, .07, .06, .0650, .06, .0445, .0550, .06, .0560, .06, .0688,
        .07, .0423, 0, .0550, .0460, 0, .0663, .0513, .04, .0475, .05,
        .0575, .0450, 0, .06, .07, .06, .0450, .07, .0625, .0470, .06, .0430,
        .0650, .06, .05, .04
    ]

    useEffect(() => {
        // if(localStorage.getItem('cart') === '{}') setEmpty(true)

        if (user && user.username && localStorage.getItem('cart') !== null) {
            let userCart = JSON.parse(localStorage.getItem('cart'))
            if (userCart && userCart[user.username] && userCart[user.username].items) {
                let cartTotal = Object.values(userCart[user.username].items).reduce((acc, item) => acc += item.price * item.quantity, 0);
                userCart[user.username].total = cartTotal;
                setCart(userCart[user.username])
                setTotal(cartTotal)
                console.log(userCart)
            }
        }

        else if (!user && localStorage.getItem('cart') !== null) {
            let userCart = JSON.parse(localStorage.getItem('cart'))
            let cartTotal;

            if(userCart && userCart.items){
                cartTotal = Object.values(userCart.items).reduce((acc, item) => acc += item.price * item.quantity, 0);
            }

            userCart.total = cartTotal;
            setCart(userCart)
            setTotal(cartTotal)
        }
    }, []);

    useEffect(() => {
        if (states.includes(shipState)) {
            let stateIndex = states.findIndex((state) => state === shipState)
            if (cart && cart.total) {
                let staSalTax = (cart.total + 5.99) * stateSalesTax[stateIndex];
                setSalesTax(staSalTax)
                setTotal((cart.total + 5.99 + staSalTax))
            }
        }
        else {
            setSalesTax("");
            if (cart && cart.total) {
                setTotal(cart.total + 5.99)
            }
        }
    }, [shipState]);

    useEffect(() => {
        if (user && user.username && localStorage.getItem('wishlist') !== null) {
            let theWishlist = JSON.parse(localStorage.getItem('wishlist'))
            let theCart = JSON.parse(localStorage.getItem('cart'))

            if (theWishlist && theWishlist[user.username] && theWishlist[user.username].items &&
                theCart && theCart[user.username] && theCart[user.username].items
            ) {
                Object.values(theCart[user.username].items).forEach(item => {
                    if (theWishlist[user.username].items[item.itemId]) {
                        delete theWishlist[user.username].items[item.itemId]
                    }
                });
                localStorage.removeItem('wishlist');
                localStorage.setItem('wishlist', JSON.stringify(theWishlist))
            }
        }

        else if (!user && localStorage.getItem('wishlist') !== null) {
            let theWishlist = JSON.parse(localStorage.getItem('wishlist'));
            let theCart = JSON.parse(localStorage.getItem('cart'))

            if (theWishlist && theWishlist.items && theCart && theCart.items) {
                Object.values(theCart.items).forEach(item => {
                    if (theWishlist.items[item.itemId]) {
                        delete theWishlist.items[item.itemId]
                    }
                })
                localStorage.removeItem('wishlist');
                localStorage.setItem('wishlist', JSON.stringify(theWishlist))
            }
        }
    }, [user])

    useEffect(() => {
        if (sameShip) {
            if (shipAddress && shipCity && shipState && shipZipCode) {
                setBillAddress(shipAddress)
                setBillCity(shipCity)
                setBillState(shipState)
                setBillZipCode(shipZipCode)
            }
            else {
                let newErrors = { ...errors }
                newErrors.sameShip = 'You must fill out the shipping address.'
                setErrors(newErrors)
            }
        }
    }, [sameShip])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const createOrderInfo = {
            items: cart ? cart.items : null,
            orderTotal: total ? total.toFixed(2) : 0,
            email,
            firstName,
            lastName,
            billAddress,
            billCity,
            billState,
            billZipCode,
            shipAddress,
            shipCity,
            shipState,
            shipZipCode,
            payFirstName,
            payLastName,
            cardNumber,
            expDate,
            cvv
        }

        if(!Object.keys(errors).length){
            const order = await dispatch(createOrderThunk(user ? user.id : null, createOrderInfo)).catch(async res => {
                let data;
    
                if (res) {
                    data = await res.json();
                }
    
                if (data && data.errors) {
                    setErrors(data.errors)
                    document.body.scrollTop = document.documentElement.scrollTop = 200;
                }
            });
    
            if (order && order.order_number) {
                navigate(`/Confirmation/?cfn=${order.order_number}`)
            }
        }
    }

    return (
        <div id='checkout-page'>
            <div id='customer-info'>
                <div><h1>Checkout</h1></div>
                <form id='checkoutForm' onSubmit={(e) => handleFormSubmit(e)}>
                    <div>
                        <h2>My Information</h2>
                        <div>
                            <div>
                                {(errors && Object.keys(errors).length > 0 && errors.email && <p>{errors.email}</p>) || <p id='hidden'>""</p>}
                                <label htmlFor='email'>Email: </label>
                                <input id='email' name='email' type='email' value={email} onChange={e => {
                                    setEmail(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.email) delete newErrors.email;
                                    setErrors(newErrors)
                                }
                                }
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.firstName && <p>{errors.firstName}</p> || <p id='hidden'>""</p>}
                                <label>First name: </label>
                                <input id='firstName' name='first name' value={firstName} onChange={e => {
                                    setFirstName(e.target.value);
                                    const newErrors = { ...errors }
                                    if (newErrors.firstName) delete newErrors.firstName;
                                    setErrors(newErrors)
                                }
                                }
                                />
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.lastName && <p>{errors.lastName}</p> || <p id='hidden'>""</p>}
                                <label>Last name: </label>
                                <input id='last Name' value={lastName} onChange={e => {
                                    setLastName(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.lastName) delete newErrors.lastName;
                                    setErrors(newErrors)
                                }
                                }
                                />
                            </div>
                        </div>
                    </div>
                    <div id='customer-ship-address'>
                        <h2>Shipping Address</h2>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.shipAddress && <p>{errors.shipAddress}</p> || <p id='hidden'>""</p>}
                                <label>Address: </label>
                                <input id='shipAddress' value={shipAddress} onChange={e => {
                                    setShipAddress(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.shipAddress) delete newErrors.shipAddress;
                                    setErrors(newErrors)
                                }
                                }
                                />
                            </div>
                            <div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.shipCity && <p>{errors.shipCity}</p> || <p id='hidden'>""</p>}
                                    <label>City: </label>
                                    <input id='shipCity' value={shipCity} onChange={e => {
                                        setShipCity(e.target.value)
                                        const newErrors = { ...errors }
                                        if (newErrors.shipCity) delete newErrors.shipCity;
                                        setErrors(newErrors)
                                    }
                                    }
                                    />
                                </div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.shipZipCode && <p>{errors.shipZipCode}</p> || <p id='hidden'>""</p>}
                                    <label>Zip code: </label>
                                    <input id='shipZipCode' type='text' value={shipZipCode} onChange={e => {
                                        setShipZipCode(e.target.value)
                                        const newErrors = { ...errors }
                                        if (newErrors.shipZipCode) delete newErrors.shipZipCode;
                                        setErrors(newErrors)
                                    }
                                    }
                                    />
                                </div>
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.shipState && <p>{errors.shipState}</p> || <p id='hidden'>""</p>}
                                <label>State: </label>
                                <select id='shipState' value={shipState} onChange={e => {
                                    setShipState(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.shipState) delete newErrors.shipState;
                                    setErrors(newErrors)
                                }
                                }>
                                    <option value=''>Select a state</option>
                                    {states.map((state, i) => (<option key={`${i}-state`} value={state}>{state}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id='customer-bill-address'>
                        <h2>Billing Address</h2>
                        <section id='same-as-ship'>
                            <label style={{ width: 'max-content', height: 'min-content', alignSelf: 'center' }}>Same as shipping:</label>
                            <input type='checkbox' value={sameShip} style={{ marginLeft: '10px', alignSelf: 'flex-end' }}
                                onChange={(e => {
                                    setSameShip(prev => !prev)
                                    if (errors.sameShip) {
                                        let newErrs = { ...errors };
                                        delete newErrs.sameShip
                                        setErrors(newErrs)
                                    }
                                })}
                            />
                        </section>

                        {errors && errors.sameShip && <p>{errors.sameShip}</p>}
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.billAddress && <p>{errors.billAddress}</p> || <p id='hidden'>""</p>}
                                <label htmlFor='address'>Address: </label>
                                <input id='billAddress' value={billAddress} onChange={e => {
                                    setBillAddress(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.billAddress) delete newErrors.billAddress;
                                    setErrors(newErrors)
                                }
                                }
                                />
                            </div>
                            <div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.billCity && <p>{errors.billCity}</p> || <p id='hidden'>""</p>}
                                    <label htmlFor='city'>City: </label>
                                    <input id='billCity' value={billCity} onChange={e => {
                                        setBillCity(e.target.value)
                                        const newErrors = { ...errors }
                                        if (newErrors.billCity) delete newErrors.billCity;
                                        setErrors(newErrors)
                                    }
                                    }
                                    />
                                </div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.billZipCode && <p>{errors.billZipCode}</p> || <p id='hidden'>""</p>}
                                    <label htmlFor='zipcode'>Zip code: </label>
                                    <input id='billZipCode' type='text' value={billZipCode} onChange={e => {
                                        setBillZipCode(e.target.value)
                                        const newErrors = { ...errors }
                                        if (newErrors.billZipCode) delete newErrors.billZipCode;
                                        setErrors(newErrors)
                                    }
                                    }
                                    />
                                </div>
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.billState && <p>{errors.billState}</p> || <p id='hidden'>""</p>}
                                <label htmlFor='state'>State: </label>
                                <select id='billState' value={billState} onChange={e => {
                                    setBillState(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.billState) delete newErrors.billState;
                                    setErrors(newErrors)
                                }
                                }>
                                    <option value=''>Select a state</option>
                                    {states.map((state, i) => (<option key={`${i}-state`} value={state}>{state}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id='paymentDiv'>
                        <h2>Payment</h2>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.payFirstName && <p>{errors.payFirstName}</p> || <p id='hidden'>""</p>}
                                <label>First name: </label>
                                <input id='payFirstName' value={payFirstName} onChange={e => {
                                    setPayFirstName(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.payFirstName) delete newErrors.payFirstName;
                                    setErrors(newErrors)
                                }
                                } />
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.payLastName && <p>{errors.payLastName}</p> || <p id='hidden'>""</p>}
                                <label>Last name: </label>
                                <input id='payLastName' value={payLastName} onChange={e => {
                                    setPayLastName(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.payLastName) delete newErrors.payLastName;
                                    setErrors(newErrors)
                                }
                                } />
                            </div>
                        </div>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.cardNumber && <p>{errors.cardNumber}</p> || <p id='hidden'>""</p>}
                                <label>Card number: </label>
                                <input id='cardNumber' type='text' value={cardNumber} onChange={e => {
                                    setCardNumber(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.cardNumber) delete newErrors.cardNumber;
                                    setErrors(newErrors)
                                }
                                } />
                            </div>
                        </div>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.expDate && <p>{errors.expDate}</p> || <p id='hidden'>""</p>}
                                <label>Expiration date: </label>
                                <input id='expDate' type='text' value={expDate} onChange={e => {
                                    setExpDate(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.expDate) delete newErrors.expDate;
                                    setErrors(newErrors)
                                }
                                } />
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.cvv && <p>{errors.cvv}</p> || <p id='hidden'>""</p>}
                                <label>CVV: </label>
                                <input id='cvv' type='text' value={cvv} onChange={e => {
                                    setCvv(e.target.value)
                                    const newErrors = { ...errors }
                                    if (newErrors.cvv) delete newErrors.cvv;
                                    setErrors(newErrors)
                                }
                                } />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            <div id='cartTotal'>
                <div>
                    <p>Subtotal: ${cart && cart.total && cart.total.toFixed(2)}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>Est. Taxes: {salesTax !== "" && salesTax >= 0 && `$${salesTax.toFixed(2)}` || 'TBD'}</p>
                </div>
                <div id='checkoutTotal' style={{ fontWeight: 'bold' }}>Total: ${total && total.toFixed(2) || cart && shipping && (cart.total + shipping).toFixed(2)}</div>
            </div>
        </div>
    )
}

export default CheckoutPage;