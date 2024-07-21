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
                    <img src='https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Men+Collection+Image.jpg' />
                    <button onClick={() => navigate('/shop/products/?gender=men')}>Shop Men's</button>
                </div>
                <div id='featured-div'>
                    <div id='p-button'>
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
                    <img src='https://capstone-project-bucket.s3.us-east-2.amazonaws.com/Women+Collection+Image.jpg' />
                    <button onClick={() => navigate('/shop/products/?gender=women')}>Shop Women's</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;