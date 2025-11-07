import React, { use, useEffect, useRef, useState } from 'react';
import { data, Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const product = useLoaderData();
    const {user} = use(AuthContext);
    const [bids,setBids] = useState([])
    // console.log(product)
    const {image,condition,usage,description,title,price_min,price_max,_id,created_at,location,seller_contact,status,seller_image,seller_name,category} = product;
    const bidReference = useRef(null);
    
    const handleModal = () => {
        bidReference.current.showModal()
    }
    
    const handleBidSubmit= (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(name,email,bid)
        const newBid = {
            product: _id,
            product_title: title,
            buyer_name : name,
            buyer_email : email,
            buyer_image: user?.photoURL,
            bid_price : bid,
            status: "pending",
        }
        fetch('https://smart-deal-server-nu.vercel.app/bids',{
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newBid)
        })
        .then(res => res.json())
        .then(data => {
            console.log('after placing bid: ',data)
            bidReference.current.close();
            if(data.insertedId){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your bid has been plaxed",
                    showConfirmButton: false,
                    timer: 2000
                });
                newBid._id = data.insertedId;
                const newBids = [...bids,newBid];
                newBids.sort((a,b) => b.bid_price - a.bid_price);
                setBids(newBids);
            }
        })
    }

    useEffect(()=>{
        fetch(`https://smart-deal-server-nu.vercel.app/products/bids/${_id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Bid for the products: ',data)
            setBids(data);
        })
    },[_id])

    return (
        <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]'>
            <div className='w-11/12 mx-auto space-y-6 py-10'>
                {/* top section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* left side */}
                    <div className='col-span-1 '>
                        <div>
                            <img src={image} className='w-full h-90 rounded-lg' alt="" />
                        </div>
                        <div className='space-y-2 p-4 bg-white mt-5 rounded-lg'>
                            <h1 className='font-semibold text-2xl mt-3 mb-5'>Product Description</h1>
                            <div className='flex justify-between items-center text-base font-bold'> 
                                <p><span className='text-primary-gradient'>Condition:</span> {condition}</p>
                                <p><span className='text-primary-gradient'>Usage Time:</span> {usage}</p>
                            </div>
                            <hr />
                            <p className='text-sm text-gray-600'>{description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste consequuntur tempore earum natus veniam odio, cum vel perferendis consectetur laudantium officia, officiis explicabo perspiciatis tempora maiores provident. Distinctio dolor excepturi inventore autem amet eius quasi omnis dolore ex, consequatur voluptatibus tempore doloribus corrupti a maxime quae repellendus. Omnis, mollitia non.</p>
                        </div>
                    </div>
                    {/* right side */}
                    <div className=' md:col-span-2 space-y-6'>
                        <h1 className='text-4xl font-semibold'>{title}</h1>
                        <div className="badge badge-soft badge-primary rounded-xl">{category}</div>
                        <div className='bg-white rounded-lg p-2'>
                            <h1 className='text-green-700 text-lg font-bold'>${price_min} - {price_max}</h1>
                            <p className='text-sm'>Price starts from</p>
                        </div>
                        <div className='bg-white rounded-lg p-2'>
                            <h1 className=' text-lg font-bold mb-3'>Products Details</h1>
                            <p className='text-sm'><span className='font-semibold'>Product ID:</span> {_id}</p>
                            <p className='text-sm'><span className='font-semibold'>Posted:</span> {created_at}</p>
                        </div>
                        <div className='bg-white rounded-lg p-2'>
                            <h1 className=' text-lg font-bold mb-3'>Seller Information</h1>
                            <div className='flex gap-3 mb-3'>
                                <img src={seller_image} className='w-10 h-10 rounded-full' alt="" />
                                <p>{seller_name}</p>
                            </div>
                            <p className='text-sm'><span className='font-semibold'>Location:</span> {location}</p>
                            <p className='text-sm'><span className='font-semibold'>Contact:</span> {seller_contact}</p>
                            <p className='text-sm'><span className='font-semibold'>Status:</span> <button className='bg-amber-200 px-2 py-0.5 rounded-xl'>{status}</button> </p>
                        </div>
                        <Link onClick={handleModal} className='btn-primary-custom w-full'>I want to buy this product</Link>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog ref={bidReference} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">Give Seller Your Offered Price</h3>
                            <form onSubmit={handleBidSubmit}>
                                <div className="card-body">
                                    <fieldset className="fieldset">

                                        <label className="label">Name</label>
                                        <input type="text" name='name' defaultValue={user?.displayName} readOnly className="input" />
                                        <label className="label">Email</label>
                                        <input type="email" name='email' className="input" defaultValue={user?.email} readOnly />
                                        <label className="label">Place your price</label>
                                        <input type="text" name='bid' className="input" placeholder="Enter the amount" />
                                        <button className="btn btn-primary-custom mt-4">Submit Bid</button>
                                    </fieldset>
                                </div>
                            </form>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                    </div>
                </div>
                {/* bottom section */}
                <div className='mt-20'>
                    <h1 className='text-3xl font-bold mb-8'>Bids For This Products: <span className='text-primary-gradient'>{bids.length}</span></h1>
                    <div className="overflow-x-auto border border-gray-300 rounded-lg">
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            {
                                bids.map((bid,index) => 
                                    <tr>
                                        <th> {index+1}</th>
                                        <td>
                                        {title}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{location}</span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                    <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td>$ {bid.bid_price}</td>
                                        <th>
                                        {/* <button className="btn btn-ghost btn-xs">{bid.status}</button> */}
                                        {bid.status === 'pending' ? <div className="badge badge-warning font-semibold">{bid.status}</div> : <div className="badge badge-success font-semibold">{bid.status}</div>}
                                        </th>
                                    </tr>
                                )
                            }
                            {/* <tr>
                                <th> </th>
                                <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                        alt="Avatar Tailwind CSS Component" />
                                    </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                                </td>
                                <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr> */}
                            
                            </tbody>
                            {/* foot */}
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;