import React from 'react';
import { Link } from 'react-router';

const ProductCard = ({product}) => {
    const {_id,title,price_min,price_max,image} = product;
    return (
        <div>
            <div className="card bg-base-100 shadow-sm">
                <figure className="px-6 pt-6 object-contain">
                    <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl h-70 w-full" />
                </figure>
                <div className="card-body mt-0 py-3">
                    <h2 className="card-title">{title}</h2>
                    <p className='font-semibold text-primary-gradient text-base my-0 text-left'>$ {price_min} - {price_max}</p>
                    <div className="card-actions">
                        <Link to={`/productDetails/${_id}`} className="btn btn-outline btn-primary w-full ">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;