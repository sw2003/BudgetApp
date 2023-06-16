import React, { useState } from 'react';
import Tab from './components/tab';
import ExpenseCatagoryForm from './components/expenseCatagoryForm';
import ExpenseCatItem from './components/expenseCatItem';

const tabList = [
	{ key: "tab-1", bg_color: "bg-orange-100", text: "Budget: " },
	{ key: "tab-2", bg_color: "bg-orange-200", text: "Remaining: " },
	{ key: "tab-3", bg_color: "bg-orange-300", text: "Total spent: " }
]

const App = () => {
	const [hasEditError, setEditError] = useState(false);
	const [editErrorMessage, setEditErrorMessage] = useState(""); 


	function handleError(isError, message) {
		if (isError){
			// error
			setEditError(true); 
			setEditErrorMessage(message); 
		}
		else{

			setEditError(false); 
			setEditErrorMessage(message); 
			// no error 
		}
	}

	const tabs = tabList.map((tab_obj) => {
		return <Tab
			key={tab_obj.key}
			bg_color={tab_obj.bg_color}
			text={tab_obj.text}
			handleError={handleError} 
			setEditError={setEditError} 
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
			<ExpenseCatItem></ExpenseCatItem>
			
		</div>
	);
};

export default App;

