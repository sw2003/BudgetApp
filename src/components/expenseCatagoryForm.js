import React, { useState } from 'react';

export default function ExpenseCatagoryForm(props) {
    const [isAdding, setIsAdding] = useState(false);

    const [name, setName] = useState('');
    const [limit, setLimit] = useState('');

    const [limitBad, setLimitBad] = useState(false);
    const [submitFailed, setSubmitFailed] = useState(false);

    function onChange(e, setter) {
        if (submitFailed) {
            setSubmitFailed(false);
        }

        if (e.target.id === 'limit') {
            if (isNaN(e.target.value)) {
                if (!limitBad) {
                    setLimitBad(true);
                }
            }
            else {
                if (limitBad) {
                    setLimitBad(false);
                }
            }
        }
        setter(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (name !== '' && !limitBad) {
            let bool = props.addExpenseCategory(name, limit);
            if (!bool) {
                setSubmitFailed(true);
                setLimit('');
                setName('');
            }
            else {
                setSubmitFailed(false);
            }
        }
    }

    return (
        <div>
            <button onClick={() => setIsAdding(!isAdding)} className="absolute right-0 top-0 mt-2 mr-4 border-2 bg-green-300 p-1.5 border-slate-700">Add Expense Category</button>
            {
                isAdding && (
                    <div className="block w-1/2 bg-orange-200 mt-2">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='flex justify-between p-1.5'>
                                <p className="inline-block p-1.5">Expense Category Name</p>
                                <input className='p-1' onChange={(e) => onChange(e, setName)} type="text" value={name} placeholder={`${submitFailed ? "you cant have duplicate category names" : ''}`}></input>
                            </div>
                            <div className='flex justify-between p-1.5'>
                                <p className="inline-block p-1.5">Category Limit</p>
                                <input className={`p-1 ${limitBad && 'text-rose-500'}`} type="text" value={limit} onChange={(e) => onChange(e, setLimit)} id="limit"></input>
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