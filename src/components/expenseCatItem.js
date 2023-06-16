import React, { useState } from 'react';

export default function ExpenseCatItem(props) {

    return (
        <div className="w-3/4 bg-orange-300 mt-2">
            <h1 className="bg-orange-200 w-1/4 mx-auto text-center py-1.5">Expenses</h1>
            <div className="w-full bg-orange-200 mt-2">
                <p className='w-1/4 mx-auto text-center'>Shopping</p>
                <ul>
                    <li>
                        <div className='flex justify-around pt-2'>
                            <p className='inline-block w-1/4'>Jordan 1s 200$</p>
                            <div className='w-1/2'>
                                <button className='bg-green-300 w-1/3 border-slate-700 border-2'>Edit</button>
                                <button className='ml-8 bg-rose-500 w-1/3 border-slate-700 border-2'>Delete</button>
                            </div>
                        </div>
                        <div className='flex justify-around pt-2'>
                            <p className='inline-block w-1/4'>PS5 200$</p>
                            <div className='w-1/2'>
                                <button className='bg-green-300 w-1/3 border-slate-700 border-2'>Edit</button>
                                <button className='ml-8 bg-rose-500 w-1/3 border-slate-700 border-2'>Delete</button>
                            </div>
                        </div>
                    </li>
                </ul>
                <form className='flex justify-around'>
                    <div className='inline-block pt-2 pb-2 w-5/12'>
                        <label className=''>Add Item</label>
                        <input className='w-1/2 ml-2' type="text"></input>
                    </div>
                    <div className='inline-block pt-2 pb-2 w-5/12'>
                        <label>Add Price</label>
                        <input className='w-1/2 ml-2' type="text"></input>
                    </div>
                </form>
                <div className='w-full w-full h-12 flex items-center justify-center mt-2'>
                    <div className='w-11/12	h-11/12 bg-white relative'>
                        <p className='w-1/4 mx-auto text-center'>500$/1300$</p>
                        <div className='w-1/2 h-full bg-black absolute top-0 left-0 opacity-10 bg-rose-500'>hi</div>
                    </div>
                </div>
            </div>
        </div>
    )
}