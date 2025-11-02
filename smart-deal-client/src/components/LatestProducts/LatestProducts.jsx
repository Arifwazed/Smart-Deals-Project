import React, { use } from 'react';
import ProductCard from './ProductCard';

const LatestProducts = ({latestPromise}) => {
    const products = use(latestPromise)
    // console.log(products)
    return (
        <div>
            <h1 className='text-4xl font-semibold text-center'>Recent <span className='text-primary-gradient'>Products</span> </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;