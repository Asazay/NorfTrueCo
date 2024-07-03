import './Homepage.css'

function Homepage() {
    return (
        <div id='body'>
            <div id='h2-div'><h2>Fall-Winter 2024 Collection</h2></div>
            <div id='main-page'>
                <div id='featured-div'>
                    <img src='https://i.imgur.com/muMtVYW.png?1' height={250} width={250} />
                    <button>Shop Men's Collection</button>
                </div>
                <div id='featured-div'>
                    <div>
                        <p id='featured-p'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <div id='featured-btn-div'>
                        <button id='shopAll-btn'>Shop All</button>
                    </div>
                </div>
                <div id='featured-div'>
                    <img src='https://i.imgur.com/muMtVYW.png?1' height={250} width={250} />
                    <button>Shop Women's Collection</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;