const searchForm = document.querySelector('form');
const searchResultDiv =document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = 'bd048022';
const APP_key = '7b1bc8863cf5e8800bad80145e207a26';
const baseUrl = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_key}`;

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});
async function fetchAPI (){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    generateHTML(data.hits)
    console.log(data);
}
function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result =>{
        generatedHTML +=
        `
        <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}">View recipe</a>
                    </div>
                    <p class="item-data">Calories: ${Math.round(result.recipe.calories)}</p>
                    <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
                    <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
                </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}