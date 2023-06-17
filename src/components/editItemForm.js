import React, { useState } from 'react';
import { nanoid } from 'nanoid';


export default function ExpenseEditForm(props) {
    const [isEditing, setEditing] = useState(false);
    const [itemName, setItemName] = useState(''); 
    const [amount, setAmount] = useState('');
    const [badAmount, setBadAmount] = useState(false); 


    function onChange(e, setter){
        if (e.target.id === 'amount'){
            if (isNaN(e.target.value)){
                if (!badAmount){
                    setBadAmount(true); 
                }
            }
            else{
                if (badAmount){
                    setBadAmount(false); 
                }
            }
        }
        setter(e.target.value); 
    }

    function onSubmit(e){
        e.preventDefault();

        props.updateEdits(props.category, itemName, amount, props.name); 
    }

    return (
        <div>
            <div className='flex justify-around pt-2'>
                <div className='w-1/2 flex justify-center align-center'>
                    <div className='mr-2 pl-2 pr-2 w-full border-2 bg-sky-300'>{props.name}</div>
                    <div className='ml-2 pl-2 pr-2 w-1/2 border-2 bg-sky-200'>{props.cost} 💰</div>
                </div>
                <div className='w-1/3'>
                    <button onClick={() => setEditing(!isEditing)} className='bg-green-300 w-1/3 border-slate-700 border-2'>{isEditing ? 'Cancel' : 'Edit'}</button>
                    <button onClick={() => props.deleteItem(props.category, props.name)}className='ml-8 bg-rose-500 w-1/3 border-slate-700 border-2'>Delete</button>
                </div>
            </div>

            {
                isEditing &&
                <form onSubmit={(e)=> onSubmit(e)}>
                    <div className='w-3/5 flex justify-around mt-2 ml-4'>
                        <input type='text' placeholder='item name' className='inline-block w-1/2 pl-2 pl-2' value={itemName} onChange={(e)=>onChange(e, setItemName)}></input>
                        <input type='text' placeholder='amount' className={`inline-block w-1/4 ${badAmount && 'text-rose-300'}`} value={amount} onChange={(e)=>onChange(e, setAmount)} id='amount'></input>
                        <button className='bg-green-300 p-.5 border-2'>Submit</button>
                    </div>
                </form>
            }

        </div>
    )
}