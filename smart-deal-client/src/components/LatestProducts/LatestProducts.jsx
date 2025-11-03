import React, { use } from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router';

const LatestProducts = ({latestPromise}) => {
    const products = use(latestPromise)
    // console.log(products)
    return (
        <div className='w-11/12 mx-auto mt-10 md:mt-15 text-center'>
            <h1 className='text-4xl font-semibold text-center mb-8'>Recent <span className='text-primary-gradient'>Products</span> </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:px-0'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
            <Link to="/allProducts" className='btn btn-primary-custom mt-10 mb-20'>Show All</Link>
        </div>
    );
};

export default LatestProducts;