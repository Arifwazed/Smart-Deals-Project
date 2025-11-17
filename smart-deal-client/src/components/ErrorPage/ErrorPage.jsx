import React from 'react';
import errorImg from '../../assets/error.png'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <div className='text-center px-2'>
                <img src={errorImg} className='object-contain w-full h-[60vh] md:h-[70vh] mx-auto' alt="" />
                <h1 className='text-lg md:text-2xl font-semibold'>The page you're looking for might have been moved,removed or might have never existed</h1>
                <div className='text-center my-10'>
                    <Link to="/" className='btn bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white  text-base font-bold my-2 md:w-50 mx-auto'>
                    <img width="35" height="50" src="https://img.icons8.com/quill/100/FFFFFF/long-arrow-left.png" alt="long-arrow-left"/>Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;