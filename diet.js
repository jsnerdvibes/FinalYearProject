const searchTxt = document.getElementById("searchedValue");
const searchBtnn = document.getElementById("searchBtn");
const searchRes = document.querySelector(".recipies");
const recipeDetailContent = document.querySelector(".recipe-detail-content");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn");




const fetchRecipes = async (query)=>{
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const resp = await data.json();
    console.log(resp);
    
    resp.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p><span>${meal.strCategory}</span></p>
        `
        const button=document.createElement("button");
        button.textContent="View Recipe"
        recipeDiv.append(button);


        button.addEventListener('click', () => {
            openRecipePopUp(meal);
        });
        

        searchRes.appendChild(recipeDiv);
    });
}

const retrievedDietarySuggestions = localStorage.getItem('dietarySuggestions');


const updateSuggestion = ()=>{
    document.querySelector(".suggestionUpdate").innerHTML=`
    
    <div class="suggestions">
        ${retrievedDietarySuggestions}
    </div

    `

} 

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList; // Move this line outside of the loop
}



const openRecipePopUp=(meal)=>{
    recipeDetailContent.innerHTML=`
    
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients :</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>

    `
    recipeDetailContent.parentElement.style.display="block"
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailContent.parentElement.style.display="none";
});

searchBtnn.addEventListener('click', () => {
    const query = searchTxt.value.trim();
    if (query) {
        searchRes.innerHTML = ''; // Clear previous search results
        fetchRecipes(query);
    } else {
        alert('Please enter a search query.');
    }
});


