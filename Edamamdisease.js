

const maxFats = localStorage.getItem('maxFats');
const minFats = localStorage.getItem('minFats');
const maxCarbohydrates = localStorage.getItem('maxCarbohydrates');
const minCarbohydrates = localStorage.getItem('minCarbohydrates');
const maxprotien = localStorage.getItem('maxprotien');
const minProtein = localStorage.getItem('minprotien');


document.addEventListener("DOMContentLoaded", function () {
    const dietSearchButton = document.getElementById("dietSearchButton");
    dietSearchButton.addEventListener("click", searchRecipesByDiet);

    const appId = 'fc6822c5';
    const appKey = '8213a7625d0704ca5fe5969a718ebee5';

    function searchRecipesByDiet() {
        const selectedDiet = document.querySelector('input[name="diet"]:checked');
        if (!selectedDiet) {
            alert("Please select a diet.");
            return;
        }
        let apiUrl;
        if (selectedDiet.value === 'low-sugar') {
            // For normal search, remove the diet parameter from the API URL
            apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&imageSize=REGULAR&health=${selectedDiet.value}`;
        } else {
            // For diet-specific search, include the diet parameter in the API URL
            apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&imageSize=REGULAR&diet=${selectedDiet.value}`;
        }
        fetchRecipes(apiUrl);
    }

    function fetchRecipes(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayRecipes(data.hits);
            })
            .catch(error => console.error('Error:', error));
    }

    function displayRecipes(hits) {
const recipesContainer = document.getElementById('recipeResults');
if (!recipesContainer) {
console.error('Recipes container not found.');
return;
}
recipesContainer.innerHTML = "";

// Sort hits array by protein content
hits.sort((a, b) => {
const proteinA = a.recipe.totalNutrients.PROCNT.quantity;
const proteinB = b.recipe.totalNutrients.PROCNT.quantity;
return proteinA - proteinB;
});

if (hits && hits.length > 0) {
hits.forEach(hit => {
    const recipe = hit.recipe;
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
        <div>
            <input type="checkbox" class="recipe-checkbox" data-protein="${Math.round(recipe.totalNutrients.PROCNT.quantity)}" data-carbs="${Math.round(recipe.totalNutrients.CHOCDF.quantity)}" data-calories="${Math.round(recipe.calories)}" data-fat="${Math.round(recipe.totalNutrients.FAT.quantity)}"> <span id="selectt">Click to Select</span>
        </div>
        <img src="${recipe.image}" alt="${recipe.label}">
        <div class="recipe-details">
            <h3>${recipe.label}</h3>
            <p>Calories: ${Math.round(recipe.calories)}</p>
            <p>Protein: ${Math.round(recipe.totalNutrients.PROCNT.quantity)} ${recipe.totalNutrients.PROCNT.unit}</p>
            <p>Fats: ${Math.round(recipe.totalNutrients.FAT.quantity)} ${recipe.totalNutrients.FAT.unit}</p>
            <p>Carbs: ${Math.round(recipe.totalNutrients.CHOCDF.quantity)} ${recipe.totalNutrients.CHOCDF.unit}</p>
            <h4>Ingredients:</h4>
            <ul>${getIngredientsList(recipe.ingredients)}</ul>
            <p><a href="${recipe.url}" target="_blank">View Recipe on Edamam</a></p>
        </div>
    `;
    recipesContainer.appendChild(recipeCard);
});

// Add event listener to all checkboxes
const recipeCheckboxes = document.querySelectorAll('.recipe-checkbox');
const achievedDiv = document.querySelector('.achieved');

let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;

recipeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const protein = parseFloat(this.getAttribute('data-protein'));
        const carbs = parseFloat(this.getAttribute('data-carbs'));
        const fat = parseFloat(this.getAttribute('data-fat'));

        if (this.checked) {
            // Recipe is selected, add its values to the totals
            totalProtein += protein;
            totalCarbs += carbs;
            totalFat += fat;

            // Add the selected-card class to the parent recipe card
            this.closest('.recipe-card').classList.add('selected-card');
        } else {
            // Recipe is deselected, subtract its values from the totals
            totalProtein -= protein;
            totalCarbs -= carbs;
            totalFat -= fat;

            // Remove the selected-card class from the parent recipe card
            this.closest('.recipe-card').classList.remove('selected-card');
        }

        // Update the content of <p> elements in the "Achieved" <div>
        const proteinP = achievedDiv.querySelector('p:nth-of-type(1)');
        proteinP.textContent = `Protein: ${totalProtein.toFixed(2)}g`;

        const carbsP = achievedDiv.querySelector('p:nth-of-type(2)');
        carbsP.textContent = `Carbs: ${totalCarbs.toFixed(2)}g`;

        const fatP = achievedDiv.querySelector('p:nth-of-type(3)');
        fatP.textContent = `Fats: ${totalFat.toFixed(2)}g`;
    });
});


} else {
recipesContainer.innerHTML = '<p>No recipes found.</p>';
}
}


    function getIngredientsList(ingredients) {
        return ingredients.map(ingredient => `<li>${ingredient.text}</li>`).join('');
    }
});

//Target for protein carbs and Fats


window.onload = function() {
    const rightDiv = document.querySelector('.right');

    // Create three <p> elements with the desired content
    const proteinP = document.createElement('p');
    proteinP.textContent = `Protein: ${minProtein}-${maxprotien}`;

    const carbsP = document.createElement('p');
    carbsP.textContent = `Carbs: ${minCarbohydrates}-${maxCarbohydrates}`;

    const fatsP = document.createElement('p');
    fatsP.textContent = `Fats: ${minFats}-${maxFats}`;

    // Append the <p> elements to the .right div
    rightDiv.appendChild(proteinP);
    rightDiv.appendChild(carbsP);
    rightDiv.appendChild(fatsP);
}
