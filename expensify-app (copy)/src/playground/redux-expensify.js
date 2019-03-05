import {createStore, combineReducers} from 'redux';
import { isNullOrUndefined } from 'util';



//Add expense
const addExpense = () => ({
    type: 'ADD_EXPENSE',
    expense: {
        
    }
})
//Remove Expense
//Edit Expense
//Set text filters
//sort by date
//sort by amount
//set start date
//set end date

//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        
        
        default: 
        return state;
    }
};

//Filter Reducer
//text => '', sortBy => 'date', startDate => undefined, endDate => undefined

const filtersReducerDefaultState ={
    text: '',
    sortBy:'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState , action) => {
    switch(action.type) {
               
        default: 
        return state;
    }
}
//Store creation 
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));
console.log(store.getState());

const demoState = { 
    expenses :[{
        id: 'eh',
        description:'blah',
        note: 'test',
        amount: 54500,
        createdAt: 0
    }],

    filters:{
        text: 'rent',
        sortBy: 'date',// date or amount 
        startDate: undefined,
        endDate: undefined
    }
};

