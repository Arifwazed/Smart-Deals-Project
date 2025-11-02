import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] text-center py-12'>
                <h1 className='text-3xl md:text-5xl font-bold'>Deal your <span className='text-primary-gradient'>Products</span> <br /> In a <span className='text-primary-gradient'>Smart</span> way !</h1>
                <p className='my-7 text-gray-500 px-3'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>
                <div className="join w-xs md:w-lg">
                    <div className='w-3/4 '>
                        {/* <label className="input validator join-item w-full rounded-l-2xl">
                        <input type="text" placeholder="Search for Products, Categoriees..." required />
                        </label> */}
                        <input type="text" className='input validator join-item w-full rounded-l-2xl focus:outline-none focus:border-gray-300' placeholder="Search for Products, Categoriees..." required />
                    </div>
                    <button className="btn btn-primary-custom join-item w-1/4! rounded-r-2xl!">Join</button>
                </div>
                <div className='my-5'>
                    <button className='btn bg-linear-to-br from-[#632EE3] to-[#9F62F2] hover:bg-none text-white hover:text-primary mr-5 '>Watch All Products</button>
                    <button className='btn btn-outline btn-primary'>Post an Product</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;