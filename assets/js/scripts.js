// TODO: Smile. You are enough.
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
        searchRecipes(event);
    } else if ($(this).attr("id") === "fetchBtn" && $("#searchCriteria").val() === "ingredient") {
        searchIngredients(event);
    } else if ($(this).attr("id") === "recipeBtn") {
        getRecipe(event);
    } else if ($(this).attr("id") === "randomFetchBtn") {
        randomCocktail();
    } else if ($(this).attr("id") === "triviaBtn") {
        trivia();
    } else {
        $("#drinkSearch").val($(this).text());
        searchRecipes();
    };
};

// search by recipe name

function searchRecipes(event) {
    clearRecipeSection()
    let drinkName = $("#drinkSearch").val();
    if (!drinkName) {
        $("#ingredients").text("Oops! We couldn't find any results for that. Please try a different search term. Be sure to use the correct selector in the dropdown menu if you are searching by cocktail name or ingredient.");
    };
    fetch(getCocktail + drinkName)
        .then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.drinks) {
                $("#ingredients").text("Oops! We couldn't find any results for that. Please try a different search term. Be sure to use the correct selector in the dropdown menu if you are searching by cocktail name or ingredient.");
            } else if (data.drinks.length === 1) {
                displayRecipe(data);
                storeCocktail(event);
            } else {
                populateDropdown(data);
            };
        });
};

// search by ingredient

function searchIngredients() {
    clearRecipeSection();
    if (!$("#drinkSearch").val()) {
        $("#ingredients").text("Oops! We couldn't find any results for that. Please try a different search term. Be sure to use the correct selector in the dropdown menu if you are searching by cocktail name or ingredient.");
    }
    fetch(ingredientSearch + $("#drinkSearch").val())
        .then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.ingredients) {
                $("#ingredients").text("Oops! We couldn't find any results for that. Please try a different search term. Be sure to use the correct selector in the dropdown menu if you are searching by cocktail name or ingredient.");
            } else {
                fetch(getIngredient + data.ingredients[0].strIngredient)
                    .then((response) => {
                        return response.json();
                    }).then((data) => {
                        populateDropdown(data);
                    })
            }
        });
}

// display recipe

function displayRecipe(data) {
    clearRecipeSection();
    $("#recipeName").text(data.drinks[0].strDrink);
    $("#alcoholic").text(data.drinks[0].strAlcoholic);
    for (i = 1; i <= 15; i++) {
        if (data.drinks[0]["strIngredient" + [i]] !== null) {
            var listItem = $("<li>").text(data.drinks[0]["strMeasure" + [i]] + " - " + data.drinks[0]["strIngredient" + [i]]);
            $("#ingredients").append(listItem);
        };
    };
    $("#instructions").text(data.drinks[0].strInstructions);
    $("#cocktailImg").attr("src", data.drinks[0].strDrinkThumb);

};

function getRecipe(event) {
    clearRecipeSection();
    fetch(getCocktail + $("#recipeList").val())
        .then((response) => {
            return response.json();
        }).then((data) => {
            displayRecipe(data);
            storeCocktail(event);
        });
}

function populateDropdown(data) {


    clearRecipeSection();
    if ($("#drinkSearch").val() === "") {
        $("#ingredients").text("Oops! We couldn't find any results for that. Please try a different search term. Be sure to use the correct selector in the dropdown menu if you are searching by cocktail name or ingredient.");
        return;
    } else {
        $("#ingredients").text("There are " + data.drinks.length + " results for " + $("#drinkSearch").val() + ". Please select an option from the list on the right.");

        let dropdown = $("#recipeList");

        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Select a Recipe</option>');
        dropdown.prop("selectedIndex", 0);
        for (i = 0; i < data.drinks.length; i++) {
            dropdown.append($("<option></option>").text(data.drinks[i].strDrink));
        };
    };
};

// random cocktail function

function randomCocktail() {
    fetch(getRandomCocktail)
        .then((response) => {
            return response.json();
        }).then((data) => {
            displayRecipe(data);
        });
};

// store recent searches in local storage

function storeCocktail(event) {
    if (cocktailArray.some(function (el) {
        return el === $("#drinkSearch").val();
    })) {
        return;
    };
    if (event.target.matches("#recipeBtn")) {
        cocktailArray.push($("#recipeList").val());
    } else {
        cocktailArray.push($("#drinkSearch").val());
    };
    localStorage.setItem("cocktail", JSON.stringify(cocktailArray));
    makeCocktailBtns();
};

// make recent search buttons

function makeCocktailBtns() {
    $("#recentSearches").empty();
    for (var i = 0; i < cocktailArray.length; i++) {
        if (cocktailArray.length >= 6) {
            cocktailArray.shift();
            var button = $("<button>").addClass("myBtns cocktailBtns").text(cocktailArray[i]);
            $("#recentSearches").append(button);
        } else {
            var button = $("<button>").addClass("myBtns cocktailBtns").text(cocktailArray[i]);
            $("#recentSearches").append(button);
        }
    };
};

// clear recipe section for clean and concise functionality

function clearRecipeSection() {
    $("#recipeName").empty();
    $("#alcoholic").empty();
    $("#ingredients").empty();
    $("#instructions").empty();
    $("#cocktailImg").attr("src", "assets/imgs/noun-drink-on-the-rocks-1245573-FB8500.svg");
};

// get a quiz question

function trivia() {
    fetch("https://the-trivia-api.com/api/questions?limit=1&tags=drinks,drink,cocktails,alcohol")
        .then((response) => {
            return response.json();
        }).then((data) => {
            $("#triviaQ").text(data[0].question);
            makeAnswerBtns(data);
        });
};

// make trivia answer buttons

function makeAnswerBtns(data) {
    $("#triviaA").empty();
    var answerArray = [];

    // push answers from api data into empty answer array

    answerArray.push(data[0].correctAnswer);
    for (i = 0; i < 3; i++) {
        answerArray.push(data[0].incorrectAnswers[i]);
    }

    // randomize answers inside array

    var l = answerArray.length, k, temp;
    while (--l > 0) {
        k = Math.floor(Math.random() * (l + 1));
        temp = answerArray[k];
        answerArray[k] = answerArray[l];
        answerArray[l] = temp;
    }

    // create and append buttons to answer section with randomized answers from array

    for (j = 0; j < answerArray.length; j++) {
        var button = $("<button>").addClass("myBtns answerBtns").text(answerArray[j]);
        $("#triviaA").append(button);
    };

    // check trivia answer buttons on click for correct/incorrect

    $(".answerBtns").click(function () {
        if ($(this).text() === data[0].correctAnswer) {
            $(this).addClass("green");
        } else {
            $(this).addClass("red");
        };
    });
};

// clear local storage and empty search history section

function clearStorage() {
    localStorage.clear();
    $("#recentSearches").empty();
};

// on load and click events

$("#fetchBtn").click(searchHandler);
$("#randomFetchBtn").click(searchHandler);
$("#recipeBtn").click(searchHandler);
$("#triviaBtn").click(searchHandler);
$("#clearBtn").click(clearStorage);
$("#recentSearches").on("click", "button", searchHandler);
makeCocktailBtns();
randomCocktail();
trivia();
