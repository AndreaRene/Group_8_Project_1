// global variables

var getCocktail = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var ingredientSearch = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i="
var getIngredient = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// local storage array

var cocktailArray = JSON.parse(localStorage.getItem("cocktail")) || [];

// search handler

var searchHandler = function (event) {

    event.preventDefault();

    if ($(this).attr("id") === "fetchBtn" && $("#searchCriteria").val() === "name") {

        searchRecipes();

    } else if ($(this).attr("id") === "fetchBtn" && $("#searchCriteria").val() === "ingredient") {

        searchIngredients();

    } else if ($(this).attr("id") === "recipeBtn") {

        getRecipe();

    } else if ($(this).attr("id") === "randomFetchBtn") {

        randomCocktail();

    } else {

        trivia();

    };
};

// search by recipe name

function searchRecipes() {

    let drinkName = $("#drinkSearch").val();

    if (!drinkName) {

        return alert("ISSUE HERE. MODAL");

    };

    fetch(getCocktail + drinkName)

        .then((response) => {

            console.log(response);
            return response.json();

        }).then((data) => {

            console.log(data);

            if (!data.drinks) {

                alert("ISSUE HERE. MODAL");

            } else if (data.drinks.length === 1) {

                displayRecipe(data);

            } else {

                populateDropdown(data);

            };
        });
};


function displayRecipe(data) {
    clearRecipeSection();
    $("#recipeName").text(data.drinks[0].strDrink);

    // TODO: get the damned list items working

    // var listItem = $("<li>").text(ingredient);
    // $("#indredients").append(listItem);

    $("#instructions").text(data.drinks[0].strInstructions);
    $("#cocktailImg").attr("src", data.drinks[0].strDrinkThumb);

};

function searchIngredients() {
    fetch(ingredientSearch + $("#drinkSearch").val())
        .then((response) => {

            console.log(response);
            return response.json();

        }).then((data) => {

            console.log(data);
            if (!data.ingredients) {
                alert("ISSUE HERE! MODAL")
            } else {
                fetch(getIngredient + data.ingredients[0].strIngredient)
                    .then((response) => {
                        console.log(response);
                        return response.json();
                    }).then((data) => {

                        console.log(data);
                        populateDropdown(data);
                    })
            }
        });
}

function getRecipe() {
    fetch(getCocktail + $("#recipeList").val())
        .then((response) => {

            console.log(response);
            return response.json();

        }).then((data) => {

            console.log(data);
            displayRecipe(data);
        });
}

function populateDropdown(data) {

    // TODO: CLEAR RECIPE DIV 
    clearRecipeSection();
    $("#ingredients").text("There are " + data.drinks.length + " results for " + $("#drinkSearch").val() + ". Please select an option from the list on the right.");

    let dropdown = $("#recipeList");

    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Select a Recipe</option>');
    dropdown.prop("selectedIndex", 0);
    for (i = 0; i < data.drinks.length; i++) {
        dropdown.append($("<option></option>").text(data.drinks[i].strDrink));
    };
};



// random cocktail function

function randomCocktail() {
    fetch(getRandomCocktail)
        .then((response) => {
            console.log("RANDOM COCKTAIL RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log("RANDOM COCKTAIL DATA", data);
            displayRecipe(data);
        });
};

function clearRecipeSection() {
    $("#recipeName").empty();
    $("#ingredients").empty();
    $("#instructions").empty();
};

$("#fetchBtn").click(searchHandler);
$("#randomFetchBtn").click(searchHandler);
$("#recipeBtn").click(searchHandler);
$("#triviaBtn").click(searchHandler);
// $("#clearBtn").click(clearStorage);
// makeCocktailBtns();