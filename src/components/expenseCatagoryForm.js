import React, { useState } from 'react';

export default function ExpenseCatagoryForm(){
    const [isAdding, setIsAdding] = useState(false); 

    return (
        <div>
            <button onClick={()=>setIsAdding(!isAdding)}className="absolute right-0 top-0 mt-2 mr-4 border-2 bg-green-300 p-1.5 border-slate-700">Add Expense Category</button>
            {
            isAdding && (
                <div className="block w-1/2 bg-orange-200 mt-2">
                    <form>
                        <div className='flex justify-between p-1.5'>
                            <p className="inline-block p-1.5">Expense Category Name</p> 
                            <input type="text"></input>
                        </div>
                        <div className='flex justify-between p-1.5'>
                            <p className="inline-block p-1.5">Category Limit</p> 
                            <input type="text"></input>
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="mx-auto bg-green-300 w-4/12 mb-2 mt-2 border-2 border-slate-700">Submit</button>
                        </div>
                    </form>
                </div>
            )
            }
        </div>
    );
}