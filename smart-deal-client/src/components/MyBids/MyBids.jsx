import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const {user} = use(AuthContext);
    const [myBids,setMyBids] = useState([]);
    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/bids?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log("my bid: ",data)
                setMyBids(data)
            })
        }
    },[user?.email])

    const handleRemoveBit = (id) => {
        console.log("remove bid id: ", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/bids/${id}`,{
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    console.log("after delete bid:",data);
                    if(data.deletedCount){
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your Bid has been deleted.",
                        icon: "success"
                        });
                        // remaining bid find out
                        const remainingBids = myBids.filter(bid => bid._id !== id);
                        setMyBids(remainingBids)

                    }
                })
            }
        });
    }
    return (
        <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] min-h-screen'>
            <div className='w-11/12 mx-auto py-10 md:py-15 text-center'>
            <h1 className='text-4xl font-bold text-center mb-8'>My Bids: <span className='text-primary-gradient'>{myBids.length}</span></h1>
            {/* <hr className='border-gray-400'/> */}
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
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            myBids.map((bid,index) => 
                                <tr>
                                    <th> {index+1}</th>
                                    <td>
                                     {bid.product_title}
                                    <br />
                                    {/* <span className="badge badge-ghost badge-sm">{location}</span> */}
                                    <span className="badge badge-ghost badge-sm">{}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                    src={ user?.photoURL ? user.photoURL : "https://img.daisyui.com/images/profile/demo/2@94.webp"}
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
                                        {bid.status === 'pending' ? <div className="badge badge-warning font-semibold">{bid.status}</div> : <div className="badge badge-success font-semibold">{bid.status}</div>}
                                    </th>
                                    <th>
                                        <button onClick={() => {handleRemoveBit(bid._id)}} className="btn btn-outline btn-secondary btn-sm">Remove Bid</button>
                                    </th>
                                </tr>
                            )
                        }
                        
                        </tbody>
                        {/* foot */}
                        
                    </table>
            </div>
            </div>
        </div>
    );
};

export default MyBids;