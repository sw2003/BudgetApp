import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const Data =[
    {
        Category: "Shopping", 
        Items: [
            {name: "Jordan-1s", cost: 230},
            {name: "Lebron Jersey", cost: 200}
        ]
    },
    {
        Category: "Electronics",
        Items: [
            {name: "Samsung TV", cost: 500},
            {name: "Fridge", cost: 1000} 
        ]

    }
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App Data={Data}/>
);

