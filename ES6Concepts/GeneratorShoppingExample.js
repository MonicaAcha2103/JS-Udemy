//Generator example of person going from home to store, getting groceries in return for cash and coming back home

function* shopping() {
	//starting from the home 

	//walking down the lane

	//go into the store with cash

	const stuffFromStore = yield 'cash';
	//pauses and resumes from here.


	const stuffFromLaundry = yield 'laundry';
	//walking back home
	return [stuffFromStore,stuffFromLaundry];
}
//stuff in the store
const gen = shopping();

gen.next();//leaving our house
//walked into the store
//walking up and down
//purchase our stuff

gen.next('groceries');//leaving the store with grociers
gen.next('clean clothes');

