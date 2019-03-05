import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addExpense({
    description: 'water Bill',
    amount: 45
}));

store.dispatch(addExpense({
    description: 'gas Bill',
    createdAt: 1000
}));

store.dispatch(addExpense({
    description: 'Rent',
    amount: 19009
}));

// store.dispatch(setTextFilter('gas'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// },3000)

const state= store.getState();
const visisbleExpenes = getVisibleExpenses(state.expenses, state.filters);

//addExpense -> water bill
//addExpense ->  gas bill
//setTextFilter -> bill(2 items) , water(1 item)
//getVisibleExpenses -> print visible ones to screen

//console.log(visisbleExpenes);
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
    
);
ReactDOM.render(jsx , document.getElementById('app'));