import React from 'react';

const CreateProduct = () => {
    return (
        <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]'>
            <div className='w-11/12 mx-auto py-10 md:py-15 text-center'>
                <h1 className='text-4xl font-bold text-center mb-8'>Create <span className='text-primary-gradient'> A Product</span> </h1>
            
                <div className="hero">
                    <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl mb-10">
                        <div className="card-body">
                            
                            <fieldset className="fieldset gap-3">
                                <div className='flex flex-col md:flex-row gap-3 md:gap-10'>
                                    <div className='md:w-1/2 text-left'>
                                        <label className="font-semibold">Title</label>
                                        <input type="text" className="input mt-1" name="" placeholder='e.g. Yamaha Fz Guitar for sale' />
                                    </div>
                                    <div className='md:w-1/2 text-left'>
                                        <label className="font-semibold">Category</label>
                                        <select defaultValue="Select a Category" className="select mt-1">
                                            <option disabled={true}>Select a Category</option>
                                            <option>Crimson</option>
                                            <option>Amber</option>
                                            <option>Velvet</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-2 gap-3 md:gap-8'>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Min Price You Want to Sale($)</label>
                                        <input type="text" className="input mt-1" name="" placeholder='e.g. 18.5' />
                                    </div>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Max Price You Want to Sale($)</label>
                                        <input type="text" className="input mt-1" name="" placeholder='Optional (default = Min Price)' />
                                    </div>                                    
                                </div>

                                <div className='grid md:grid-cols-2 gap-3 md:gap-8'>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Product Condition</label> <br />
                                        <input type="radio" name="Brand New" className="radio radio-primary radio-xs mr-1 mt-1" defaultChecked /> Brand New
                                        <input type="radio" name="Used" className="radio radio-primary radio-xs mx-1 mt-1" /> Used
                                    </div>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Product Usage Time</label>
                                        <input type="text" className="input mt-1" name="" placeholder='e.g. 1 year 3 month' />
                                    </div>                                    
                                </div>

                                <div className='flex flex-col text-left'>
                                    <label className="font-semibold">Your Product Image URL</label>
                                    <input type="text" className="input mt-1 px-1 w-full" placeholder="https://...." />
                                </div>

                                <div className='grid md:grid-cols-2 gap-3 md:gap-8'>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Seller Name</label>
                                        <input type="text" className="input mt-1" name="" placeholder='e.g. Artisan Poasters' />
                                    </div>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Seller Email</label>
                                        <input type="email" className="input mt-1" name="" placeholder='Enter your email' />
                                    </div>                                    
                                </div>

                                <div className='grid md:grid-cols-2 gap-3 md:gap-8'>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Seller Contact</label>
                                        <input type="text" className="input mt-1" name="" placeholder='e.g. +8801' />
                                    </div>
                                    <div className='w-full text-left'>
                                        <label className="font-semibold">Seller Image URL</label>
                                        <input type="text" className="input mt-1 px-1" name="" placeholder='https://....' />
                                    </div>                                    
                                </div>

                                <div className='flex flex-col text-left'>
                                    <label className="font-semibold">Location</label>
                                    <input type="text" className="input mt-1 pr-1 w-full" placeholder="City, Country" />
                                </div>

                                <fieldset className="fieldset text-left pr-2">
                                    <legend className="fieldset-legend">Simple Description about your Product</legend>
                                    <textarea className="textarea h-20 w-full " placeholder="e.g simple details of the product"></textarea>
                                </fieldset>

                                {/* <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" /> */}
                                
                                <button className="btn btn-primary-custom mt-4">Create a Product</button>
                            
                            </fieldset>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
};

export default CreateProduct;