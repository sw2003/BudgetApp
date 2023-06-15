import React, { useState } from 'react';

export default function ExpenseCatagoryForm(){
    const [isAdding, setIsAdding] = useState(false); 

    return (
        <div>
            <button onClick={()=>setIsAdding(!isAdding)}className="absolute right-0 mt-2 mr-4 border-2 bg-green-300 p-1.5 border-slate-700">Add Expense Category</button>
            {
            isAdding && (
                <form className="block w-3/4 bg-yellow-50">
                    <input type="text"></input>
                    
                </form>
            )
            }
        </div>
    );
}