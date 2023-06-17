import React, { useState } from 'react';
import Tab from './components/tab';
import ExpenseCatagoryForm from './components/expenseCatagoryForm';
import ExpenseCatItem from './components/expenseCatItem';


const tabList = [
	{ key: "tab-1", bg_color: "bg-orange-100", text: "Budget: " },
	{ key: "tab-2", bg_color: "bg-orange-200", text: "Remaining: " },
	{ key: "tab-3", bg_color: "bg-orange-300", text: "Total spent: " }
]

const App = ({Data}) => {
	let counter = 0; 
	for (let i = 0; i<Data.length; i++){
		for (let j=0; j<Data[i].Items.length; j++){
			counter+= Data[i].Items[j].cost;
		}
	}
	const [data, setData] = useState(Data); 

	const [budget, setBudget] = useState(2000);
	const [remaining, setRemaining] = useState(2000-counter);
	const [totalSpent, setTotalSpent] = useState(counter); 

	const [hasEditError, setEditError] = useState(false);
	const [editErrorMessage, setEditErrorMessage] = useState(""); 

	function handleError(isError, message) {
		if (isError){
			setEditError(true); 
			setEditErrorMessage(message); 
		}
		else{
			setEditError(false); 
			setEditErrorMessage(message); 
		}
	}

	function addExpense(category, name, price){
		for (let i = 0; i<data.length; i++){
			if (data[i].Category === category){

				let dataCopy = [...data]; 

				let itemsList = data[i].Items;
				itemsList.push({name: name, cost: price})

				let num = parseFloat(price); 
				setTotalSpent(totalSpent + num);
				setRemaining(remaining - num);

				dataCopy[i].Items = itemsList

				setData(dataCopy); 
			}
		}
	}

	function updateEdits(category, name, amount, oldname){
		for (let i = 0; i<data.length; i++){
			if (data[i].Category === category){
				for (let j = 0; j<data[i].Items.length; j++){
					if (data[i].Items[j].name === oldname){
						let arrayCopy = [...data]; 
						let itemsList = data[i].Items;
						
						let objectCopy = {...data[i].Items[j], name: name, cost: amount}
						arrayCopy[i].Items[j] = objectCopy

						setData(arrayCopy);
					}
				}
			}
		}
	}

	function deleteItem(category, name){
		for (let i = 0; i<data.length; i++){
			if (data[i].Category === category){
				let arrayCopy = [...data]; 

				let updatedItemsArray = data[i].Items.filter((obj)=>{
					if (obj.name === name){
						
						setRemaining(remaining + parseFloat(obj.cost));
						setTotalSpent(totalSpent - parseFloat(obj.cost));

						return false;
					}
					return true; 
				})

				arrayCopy[i].Items = updatedItemsArray;

				setData(arrayCopy);
			}
			
		}
	}

	const tabs = tabList.map((tab_obj) => {
		return <Tab
			key={tab_obj.key}
			bg_color={tab_obj.bg_color}
			text={tab_obj.text}
			handleError={handleError} 
			setEditError={setEditError} 
			budget={budget}
			remaining={remaining} 
			totalSpent={totalSpent}
			setBudget={setBudget} 
			setRemaining={setRemaining} 
			setTotalSpent={setTotalSpent} 
		/>
	})
	
	const categorys = data.map((obj)=>{
		return <ExpenseCatItem
			key={obj.Category} 
			Category={obj.Category} 
			Items={obj.Items} 
			Limit={obj.Limit}
			totalSpent={totalSpent} 
			setTotalSpent={setTotalSpent}
			addExpense={addExpense} 
			updateEdits={updateEdits}
			deleteItem={deleteItem}
		/>
	})
	
	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="mx-auto block w-1/2 text-center my-2 subpixel-antialiased text-xl">Budget Tracker</h1>
			<div className="w-full flex justify-between h-11">
				{tabs}
			</div>
			{
				hasEditError && (
					<p className="text-red-600">{editErrorMessage}</p>
				)
			}
			<div className="relative w-full">
				<ExpenseCatagoryForm></ExpenseCatagoryForm>
			</div>
			{categorys} 		
		</div>
	);
};

export default App;

