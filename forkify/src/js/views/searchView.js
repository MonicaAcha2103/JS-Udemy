import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''; 
}
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};
// grill cheese toast with sauce
//acc: 0, 0+5<=17, true |  newTitle=['grill']
//acc: 5, 5+6<=17, true | newTitle=['grill','cheese']
//acc: 11, 11+5<=17, true | newTitle=['grill','cheese','toast']
//acc:16, 16+4 <=17 false | newTitle=['grill','cheese','toast']
//acc:20, 20+5 <=17 false | newTitle=['grill','cheese','toast']
export const limitRecipeTitle = (title, limit= 17) => {
    const newTitle =[];
        if(title.length > limit){
           
            title.split(' ').reduce((acc, cur) => {
                if(acc + cur.length <= limit) {
                    newTitle.push(cur)
                }
                return acc + cur.length;
            },0)
            return (`${newTitle.join(' ')}...`);
        }
    return title;
}
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
        //console.log(elements.searchResList);
        elements.searchResList.insertAdjacentHTML('beforeend', markup);

}

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>


`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1) {
        //Button to next page
        button = createButton(page,'next');

    } else if(page < pages) {
        //Button to next and prev page
        button= `
        ${createButton(page,'next')}
        ${createButton(page,'prev')}
        `;

        createButton(page,'prev');
    } else if(page === pages  && pages >1) {
        //Button to prev page
        button = createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1,resPerPage = 10) => {
    //render results of current page

    const start = (page -1)*resPerPage;
    const end = page * (resPerPage);
    //slice extracts does not include the end
    recipes.slice(start,end).forEach((el) => renderRecipe(el));

    //render buttons
    renderButtons(page, recipes.length, resPerPage);
}