// global variables

var getCocktail = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var getIngredient = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

// local storage array

var cocktailArray = JSON.parse(localStorage.getItem("cocktail")) || [];

//search handler 

var searchHandler = function (event) {
    event.preventDefault();
    if ($(this).attr("id") === "fetchBtn") {
        var userInput = $("#drinkSearch").val();
        console.log(userInput);
        search(userInput);
    } else if ($(this).attr("id") === "randomFetchBtn") {
        random();
    } else {
        trivia();
    };
};

// search by cocktail name 

function search(userInput) {
    if ($("#searchCriteria").val() === "name") {
        fetch(getCocktail + userInput)
            .then((response) => {
                console.log("BY NAME COCKTAIL", response);
                return response.json();
            }).then((data) => {
                console.log("BY NAME COCKTAIL DATA", data);
                console.log($("#searchCriteria").val());
            });
    } else {
        fetch(getIngredient + userInput)
            .then((response) => {
                console.log("BY INGREDIENT COCKTAIL", response);
                return response.json();
            }).then((data) => {
                console.log("BY NAME INGREDIENT DATA", data);
                console.log($("#searchCriteria").val());
            });
    };
};

// get a random cocktail

function random() {
    fetch(getRandomCocktail)
        .then((response) => {
            console.log("RANDOM COCKTAIL RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log("RANDOM COCKTAIL DATA", data);
        });
};

// get a quiz question

function trivia() {
    fetch("https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=1&difficulty=easy&tags=alcohol,cocktails")
        .then((response) => {
            console.log("TRIVIA RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log("TRIVIA DATA", data);
            $("#triviaQ").text(data[0].question);
            console.log(data[0].question);
            makeBtns(data);
        });

};

function makeBtns(data) {
    // how to randomize where the correct answer is?
    var answerArray = [];
    answerArray.push(data[0].correctAnswer);
    for (i = 0; i < 3; i++) {
        answerArray.push(data[0].incorrectAnswers[i]);
    }
    console.log(answerArray);
    for (j = 0; j < answerArray.length; j++) {
        var button = $("<button>").addClass("myBtns answerBtns").text(answerArray[j]);
        $("#triviaA").append(button);
    };
};

$("#clearBtn").click(clearStorage);

// clear button to clear local storage and reload page

function clearStorage() {
    localStorage.clear();
    $("#recentSearches").empty();
};

// on click and on load events

$("#fetchBtn").click(searchHandler);
$("#randomFetchBtn").click(searchHandler);
$("#triviaBtn").click(searchHandler);
