import React, { useState, useEffect, useCallback } from 'react';

export default function Tab(props) {
    const budget = props.budget; 
    const remaining = props.remaining;
    const totalSpent = props.totalSpent;

    const [editingBudget, setEditingBudget] = useState(""); 
    const [isEditingBudget, setIsEdit] = useState(false);
    
    const [logFlag, setLogFlag] = useState(false);

    function cancelEdit(){
        setIsEdit(false); 
        props.setEditError(false);
        setEditingBudget(""); 
    }

    function handleSubmit(e){
        e.preventDefault(); 

        if (checkBudget()){
            props.setBudget(editingBudget);
            props.setRemaining(parseFloat(editingBudget) - totalSpent);

            setIsEdit(false); 
            setEditingBudget("");
        }
    }

    const checkBudget = useCallback(()=>{
        if (editingBudget === ""){
            props.handleError(true, "Field can't be empty");
            return false; 
        }
        
        if (!isNaN(editingBudget)){
            props.handleError(false, ""); 
            return true; 
        }
        else{
            props.handleError(true, "There can't be any alphabetical characters"); 
            return false; 
        }
    }, [editingBudget, props])
    
    const updateEditBudget = (e) => {
        setEditingBudget(e.target.value);
        setLogFlag(true);
    }

    useEffect(()=>{
        if (logFlag){
            checkBudget(); 
            setLogFlag(false);
        }
    }, [editingBudget, checkBudget, logFlag])

    if (props.text === "Budget: ") {
        const displayTemplate = (
            <div className={props.bg_color + " w-1/3 flex justify-between items-center"}>
                <h1 className="h-1/2 ml-2.5">{props.text} {budget}</h1>
                <button onClick={()=>setIsEdit(true)}className="w-1/3 h-1/2 mr-2 border-solid border-2 flex items-center justify-center border-slate-700 rounded-3xl bg-green-300">Edit</button>
            </div>
        )

        const editTemplate = (
            <div className={props.bg_color + " w-1/3 flex justify-between items-center"}>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    <input className="ml-3 pl-1.5" type="text" value={editingBudget} onChange={(e)=>updateEditBudget(e)}></input>
                </form>
                <button onClick={()=>cancelEdit()}className="w-1/3 h-1/2 mr-2 border-solid border-2 flex items-center justify-center border-slate-700 rounded-3xl bg-rose-400">Cancel</button>
            </div>
        )
        return isEditingBudget ? editTemplate : displayTemplate; 
    }
    else if (props.text === "Remaining: "){
        return (
            <div className={props.bg_color + " w-1/3 text-center flex items-center justify-center"}>{props.text} {props.remaining}</div>
        )
    }
    else{
        return (
            <div className={props.bg_color + " w-1/3 text-center flex items-center justify-center"}>{props.text} {props.totalSpent}</div>
        )
    }



   
}

