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
                storeCocktail();
            } else {
                populateDropdown(data);
            };
        });
};


function displayRecipe(data) {
    clearRecipeSection();
    $("#recipeName").text(data.drinks[0].strDrink);

    console.log(data.drinks[0].strIngredient1);

    // TODO: get the damned list items working
    for (i = 1; i <= 15; i++) {
        if (data.drinks[0]["strIngredient" + [i]] !== null) {
            var listItem = $("<li>").text(data.drinks[0]["strIngredient" + [i]]);
            console.log(listItem);
            $("#ingredients").append(listItem);
        };
    };

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

function getRecipe(event) {
    fetch(getCocktail + $("#recipeList").val())
        .then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            console.log(data);
            displayRecipe(data);
            storeCocktail(event);
        });
}

function populateDropdown(data) {

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

// store recent searches in local storage

function storeCocktail(event) {
    if (cocktailArray.some(function (el) {
        return el === $("#drinkSearch").val();
    })) {
        return;
    };
    console.log(event.target.matches("#recipeBtn"));
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
    $("#ingredients").empty();
    $("#instructions").empty();
};

// get a quiz question

function trivia() {
    fetch("https://the-trivia-api.com/api/questions?limit=1&tags=drinks,drink,cocktails,alcohol")
        .then((response) => {
            console.log("TRIVIA RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log("TRIVIA DATA", data);
            $("#triviaQ").text(data[0].question);
            console.log(data[0].question);
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

    console.log(answerArray);
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
makeCocktailBtns();
trivia();