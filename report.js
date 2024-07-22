document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    const height = parseFloat(localStorage.getItem('height'));
    const weight = parseFloat(localStorage.getItem('weight'));
    const age = parseInt(localStorage.getItem('age'));
    const gender = localStorage.getItem('gender');
    const bmi = parseFloat(localStorage.getItem('bmi'));

    // Declare variables outside of the function
    var minProtein, maxProtein, minCarbohydrates, maxCarbohydrates, minFats, maxFats;

    // Function to determine weight category
    function weightCategory(BMI) {
        if (BMI < 18.5) {
            return "underweight";
        } else if (BMI >= 18.5 && BMI < 25) {
            return "normal weight";
        } else if (BMI >= 25 && BMI < 30) {
            return "overweight";
        } else {
            return "obese";
        }
    }

    // Function to provide suggestion based on weight category
    function weightSuggestion(category) {
        switch (category) {
            case "underweight":
                return "You may need to increase your calorie intake with a balanced diet including protein and healthy fats.";
            case "normal weight":
                return "Maintain your current diet and exercise routine to stay healthy.";
            case "overweight":
                return "Consider reducing your calorie intake and incorporating more physical activity into your routine.";
            case "obese":
                return "Consult a healthcare professional for personalized advice on weight management.";
            default:
                return "Unable to provide suggestion.";
        }
    }

    // Function to provide dietary adjustments based on weight category and gender
    function dietaryAdjustments(category, weight, height, gender) {
        switch (category) {
            case "underweight":
                if (gender === "male") {
                    minProtein = Math.round(weight * 1.1);
                    maxProtein = Math.round(weight * 2.0);
                    minCarbohydrates = Math.round(weight * 4);
                    maxCarbohydrates = Math.round(weight * 6);
                    minFats = Math.round(weight * 0.4);
                    maxFats = Math.round(weight * 0.6);
                } else if (gender === "female") {
                    minProtein = Math.round(weight * 1);
                    maxProtein = Math.round(weight * 1.6);
                    minCarbohydrates = Math.round(weight * 3.5);
                    maxCarbohydrates = Math.round(weight * 5.5);
                    minFats = Math.round(weight * 0.35);
                    maxFats = Math.round(weight * 0.55);
                } else {
                    minProtein = Math.round(weight * 1.05);
                    maxProtein = Math.round(weight * 1.8);
                    minCarbohydrates = Math.round(weight * 3.75);
                    maxCarbohydrates = Math.round(weight * 5.75);
                    minFats = Math.round(weight * 0.375);
                    maxFats = Math.round(weight * 0.575);
                }
                return `For weight gain, aim for approximately ${minProtein} - ${maxProtein} grams of protein, ${minCarbohydrates} - ${maxCarbohydrates} grams of carbohydrates, and ${minFats} - ${maxFats} grams of healthy fats per day.`;
            case "normal weight":
                if (gender === "male") {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.6);
                    minCarbohydrates = Math.round(weight * 3.5);
                    maxCarbohydrates = Math.round(weight * 5.5);
                    minFats = Math.round(weight * 0.35);
                    maxFats = Math.round(weight * 0.55);
                } else if (gender === "female") {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.4);
                    minCarbohydrates = Math.round(weight * 3.5);
                    maxCarbohydrates = Math.round(weight * 5.5);
                    minFats = Math.round(weight * 0.35);
                    maxFats = Math.round(weight * 0.55);
                } else {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.5);
                    minCarbohydrates = Math.round(weight * 3.5);
                    maxCarbohydrates = Math.round(weight * 5.5);
                    minFats = Math.round(weight * 0.35);
                    maxFats = Math.round(weight * 0.55);
                }
                return `To maintain weight, aim for approximately ${minProtein} - ${maxProtein} grams of protein, ${minCarbohydrates} - ${maxCarbohydrates} grams of carbohydrates, and ${minFats} - ${maxFats} grams of healthy fats per day.`;
            case "overweight":
                if (gender === "male") {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.6);
                    minCarbohydrates = Math.round(weight * 2.5);
                    maxCarbohydrates = Math.round(weight * 4.5);
                    minFats = Math.round(weight * 0.3);
                    maxFats = Math.round(weight * 0.5);
                } else if (gender === "female") {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.4);
                    minCarbohydrates = Math.round(weight * 2.5);
                    maxCarbohydrates = Math.round(weight * 4.5);
                    minFats = Math.round(weight * 0.3);
                    maxFats = Math.round(weight * 0.5);
                } else {
                    minProtein = Math.round(weight * 0.8);
                    maxProtein = Math.round(weight * 1.5);
                    minCarbohydrates = Math.round(weight * 2.5);
                    maxCarbohydrates = Math.round(weight * 4.5);
                    minFats = Math.round(weight * 0.3);
                    maxFats = Math.round(weight * 0.5);
                }
                return `To lose weight, aim for approximately ${minProtein} - ${maxProtein} grams of protein, ${minCarbohydrates} - ${maxCarbohydrates} grams of carbohydrates, and ${minFats} - ${maxFats} grams of healthy fats per day.`;
            case "obese":
                return "For individuals with obesity, it's important to seek guidance from a healthcare professional or registered dietitian for personalized dietary recommendations and support in achieving weight loss goals.";
            default:
                return "Unable to provide dietary adjustments.";
        }
    }

    // Determine weight category
    var category = weightCategory(bmi);

    // Provide suggestion based on weight category
    var suggestion = weightSuggestion(category);

    // Provide dietary adjustments based on weight category and gender
    var dietarySuggestions = dietaryAdjustments(category, weight, height, gender);

    localStorage.setItem('dietarySuggestions', dietarySuggestions);

    localStorage.setItem('minprotien', minProtein);
    localStorage.setItem('maxprotien', maxProtein);
    localStorage.setItem('minCarbohydrates',minCarbohydrates);
    localStorage.setItem('maxCarbohydrates',maxCarbohydrates);
    localStorage.setItem('minFats',minFats);
    localStorage.setItem('maxFats',maxFats);


    // Output in report div
    const reportDiv = document.querySelector('.report');
    reportDiv.innerHTML = `
        <h2>BMI Report</h2>
        <p><strong>Height:</strong> ${height} meters</p>
        <p><strong>Weight:</strong> ${weight} kilograms</p>
        <p><strong>Age:</strong> ${age} years</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>BMI:</strong> ${bmi.toFixed(2)}</p>
        <p><strong>Weight Category:</strong> ${category}</p>
        <p><strong>Suggestion:</strong> ${suggestion}</p>
        <p><strong>Dietary Adjustments:</strong> ${dietarySuggestions}</p><br><br>

        <p><strong>Click Below to look for Diets</strong></p><br>
        <a href="Edamamdisease.html">Diets</a>
    `;
});
