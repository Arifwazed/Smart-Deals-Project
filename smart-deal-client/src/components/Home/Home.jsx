import React, { useState } from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';
import LoaderSpin from './LoaderSpin';
import Banner from './Banner';

const latestPromise = fetch('http://localhost:3000/latestproducts').then(res => res.json())
const Home = () => {
    const [loading,setLoading] = useState(false);
    return (
        <div className='bg-[#f0f0f0]'>
            {/* {
                loading ? <LoaderSpin></LoaderSpin> : (<LatestProducts latestPromise={latestPromise}></LatestProducts>)
            } */}
            
            <Banner></Banner>
            <LatestProducts latestPromise={latestPromise}></LatestProducts>
        </div>
    );
};

export default Home;