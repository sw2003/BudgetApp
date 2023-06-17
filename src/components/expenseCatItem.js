import React, { useState } from 'react';

export default function ExpenseCatItem(props) {
    const [submitValid, setSubmitValid] = useState(true); 
    const [addPriceValid, setAddPriceValid] = useState(true); 
    const [addPrice, setAddPrice] = useState(""); 

    const [AddItemText, setAddItemText] = useState("");

    function onChange(e, state, setterValid, setterValue){
        if (setterValid){
            if (isNaN(e.target.value)){
                if (state){
                    setterValid(false);
                }
            }
            else{
                if (!addPriceValid){
                    setterValid(true); 
                }
            }
        }
        setterValue(e.target.value); 
    }

    function onSubmit(e){
        e.preventDefault(); 

        if (AddItemText !== '' && addPriceValid){
            props.addExpense(props.Category, AddItemText, addPrice); 
        }
    }

    const items = props.Items.map((obj) => {
        return (
            <div key={obj.name} className='flex justify-around pt-2'>
                <p className='inline-block w-1/4'>{obj.name} {obj.cost}$</p>
                <div className='w-1/2'>
                    <button className='bg-green-300 w-1/3 border-slate-700 border-2'>Edit</button>
                    <button className='ml-8 bg-rose-500 w-1/3 border-slate-700 border-2'>Delete</button>
                </div>
            </div>
        )
    })

    return (
        <div className="w-3/4 bg-orange-300 mt-2 relative">
            <button className='absolute right-0 top-0 mr-4 mt-2 pl-2 pr-2 bg-green-300 border-2 border-slate-700'>Edit Category</button>
            <h1 className="bg-orange-200 w-1/4 mx-auto text-center py-1.5">{props.Category}</h1>
            <div className="w-full bg-orange-200 mt-2">
                <ul>
                    <li>
                        {items}
                    </li>
                </ul>
                <form className={`flex justify-around mt-2 border-2 p-2 m-2 ${submitValid ? 'border-orange-100': 'border-rose-500'}`} onSubmit={(e)=>onSubmit(e)}>
                    <div className='inline-block pt-2 pb-2 w-5/12'>
                        <label className='ml-2'>Add Item</label>
                        <input className='w-1/2 ml-2' type="text" value={AddItemText} onChange={(e)=>onChange(e, false, null, setAddItemText)}></input>
                    </div>
                    <div className='inline-block pt-2 pb-2 w-5/12'>
                        <label>Add Price</label>
                        {
                            addPriceValid ? <input className='w-1/2 ml-2' type="text" value={addPrice} onChange={(e)=>onChange(e, addPriceValid, setAddPriceValid, setAddPrice)}></input> : 
                            <input className='w-1/2 ml-2 text-rose-500' type="text" value={addPrice} onChange={(e)=>onChange(e, addPriceValid, setAddPriceValid, setAddPrice)}></input>
                        }
                    </div>
                    <button className='border-2 bg-green-300 border-slate-700 pl-2 pr-2 pt-.5 pb-.5'>Submit</button>
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