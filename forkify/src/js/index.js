import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

/* 
GLOBAL STATE
-- search object 
-- current recipe object 
-- shopping  list object
-- liked recipes
*/

const state = {};
// SEARCH CONTROLLER
const controlSearch = async () => {
    //1. Get the query from the view

    const query = searchView.getInput();
    
    //2. new search object and add to state
    if(query){
        state.search = new Search(query);
    }

    //3. Preparing UI for results
    searchView.clearInput();
    searchView.clearResults();
    //4. Search for recipes
    renderLoader(elements.searchRes);

    try {
        await state.search.getResults();

        //5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }catch (err){
        alert('Something went wrong');
        clearLoader();
    }
}
elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //event can be a text, image or any html element
    // to access only the button use closest
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

//RECIPE CONTROLLER

//const r = new Recipe(47025);
//r.getRecipe();

const controlRecipe = async () => {
    //Get ID from the url
    const id = window.location.hash.replace('#','');
    if(id) {
        // Prepare the UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //HIGHLIGHT
        if(state.search) {
        searchView.highlightSelected(id);}
        //Create new recipe object
        
        state.recipe = new Recipe(id);
       
        try {
            //get recipe data nad parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe,
            state.likes.isLiked(id));

        
        } catch(err) {
            alert('Error processing the recipe');
        }
    }
}
//LIST CONTROLLER
const controlList = () => {
    //create a list if there is not a list
    if(!state.list) state.list= new List();
    //Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}

//LIKE CONTROLLER

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)){
        //Add the like to the data
        console.log(state.recipe)
       const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle the like button
        likesView.toggleLikeBtn(true)

        //add like to the Like List
        likesView.renderLike(newLike);

        //console.log(state.likes);
        //User has liked current recipe
    } else {
        //Remove the like to the data
       state.likes.deleteLike(currentID);
        //Toggle the like button
        likesView.toggleLikeBtn(false)
        //Remove like from the Like List
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};
//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

//servings button event delegation using matches


// Handling recipe button clicks.
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            //recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        //recipeView.updateServingsIngredients(state.recipe);
    } 
    if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
        controlList();
        //console.log('here');
    } else if(e.target.matches('.recipe__love ,.recipe__love *')){
        //like controller

        controlLike();
    }
});



//handle delete and update list items
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //console.log(id);
        //delete frm state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id);
//Handle count update
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id,val);
    } 
})

//Restore like recipes on page load
window.addEventListener('load', () => {

    state.likes = new Likes();
    //restore likes
    state.likes.readStorage();
    
    //toggle button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    //render the likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

})