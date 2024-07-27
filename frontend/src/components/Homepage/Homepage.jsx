import './Homepage.css'
import { useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    const handleShopAll = (e) => {
        e.preventDefault();
        navigate('/shop/products/');
    }


    return (
        <div id='body'>
            <div id='h2-div'>
                <h2>Fall-Winter 2024 Collection</h2>
                <p>Coming soon!</p>
            </div>
            <div id='main-page'>
                <div id='featured-div'>
                    <img src='https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Men+collection+image+new+new.avif' alt=''/>
                    <button onClick={() => navigate('/shop/products/query/?gender=men')}>Shop Men's</button>
                </div>
                <div id='featured-div'>
                    <div id='p-button'>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{width: '200px', height: '200px', alignSelf: 'center', padding: 0}} src='https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Norf-True-Logo.png' alt=''></img>

                        </div>
                        <p id='featured-p'>
                            Norf True Co. is not just a brand its creativity, passion, and love.
                            Check out our latest collections and styles to feed your fashion desires!
                        </p>
                    </div>
                    <div id='featured-btn-div'>
                            <button onClick={handleShopAll} id='shopAll-btn'>Shop All</button>
                        </div>
                </div>
                <div id='featured-div'>
                    <img src='https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Women+Fall+Collection+Image.jpg' alt=''/>
                    <button onClick={() => navigate('/shop/products/query/?gender=women')}>Shop Women's</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;