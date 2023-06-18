import React, { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import ExpenseEditForm from './editItemForm';


export default function ExpenseCatItem(props) {


    function getBarData(){
        const limit = props.Limit; 

        let counter = 0; 
        for (let i = 0; i<props.Items.length; i++){
            let cost = parseFloat(props.Items[i].cost);
            counter += cost; 
        }
    
        const percent = Math.floor((counter/limit) * 100);

        return [percent, counter]; 
    }

    let percent = getBarData()[0]; 
    let count = getBarData()[1];



    const [barStyle, setBarStyle] = useState({width: `${percent >= 100 ? '100': percent}%`}) 

    const [submitValid, setSubmitValid] = useState(true); 
    const [addPriceValid, setAddPriceValid] = useState(true); 
    const [addPrice, setAddPrice] = useState(""); 

    const [AddItemText, setAddItemText] = useState("");

    const [counter, setCounter] = useState(count); 

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

    useEffect(()=>{
        setBarStyle({width: `${getBarData()[0]>=100 ? '100': getBarData()[0]}%`});
        setCounter(getBarData()[1]);

    }, [props.data])

    function onSubmit(e){
        e.preventDefault(); 

        if (AddItemText !== '' && addPriceValid){
            setSubmitValid(true); 
            props.addExpense(props.Category, AddItemText, addPrice); 
            setAddItemText('');
            setAddPrice('');

            setCounter(getBarData()[1]);

            setBarStyle({width: `${getBarData()[0]>=100 ? '100': getBarData()[0]}%`});
        }
        else{
            setSubmitValid(false); 
        }
    }

    const items = props.Items.map((obj) => {
        return (
            <ExpenseEditForm key={`${nanoid()}`} name={obj.name} cost={obj.cost} category={props.Category} updateEdits={props.updateEdits} deleteItem={props.deleteItem}></ExpenseEditForm>
        )
    })

    return (
        <div className="w-3/4 bg-orange-300 mt-2 relative">
            <h1 className="bg-orange-200 w-1/4 mx-auto text-center py-1.5">{props.Category}</h1>
            <button onClick={()=>props.deleteCategory(props.Category)} className='absolute top-0 right-0 mt-1 mr-1'>❌</button>
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
                <div className='w-full w-full h-12 flex items-center justify-center mt-2 max-h-12'>
                    <div className='w-11/12	h-11/12 bg-white relative'>
                        <p className={`w-1/4 mx-auto text-center ${parseFloat(counter) <= 0 && 'text-rose-500'}`}>{`${counter}/${props.Limit}$`}</p>
                        <div className='h-full bg-black absolute top-0 left-0 opacity-10 bg-rose-500 transition-all duration-500' style={barStyle}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}