import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../LatestProducts/ProductCard';

const AllProducts = () => {
    const products = useLoaderData();
    return (
        <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]'>
            <div className='w-11/12 mx-auto py-10 md:py-15 text-center'>
            <h1 className='text-4xl font-bold text-center mb-8'>All <span className='text-primary-gradient'>Products</span> </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-3 md:px-0'>
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
            
        </div>
        </div>
    );
};

export default AllProducts;