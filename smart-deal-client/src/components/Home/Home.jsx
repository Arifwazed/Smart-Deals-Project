import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestPromise = fetch('http://localhost:3000/latestproducts').then(res => res.json())
const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <h1>This is Home</h1>
            <LatestProducts latestPromise={latestPromise}></LatestProducts>
        </div>
    );
};

export default Home;