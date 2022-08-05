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
                console.log("BY INGREDIENT DATA", data);
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
    fetch("https://the-trivia-api.com/api/questions?limit=1&tags=drinks,drink,cocktails,alcohol")
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

// make trivia answer buttons

function makeBtns(data) {

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


// clear button to clear local storage and reload page

function clearStorage() {
    localStorage.clear();
    $("#recentSearches").empty();
};

// on click and on load events

$("#fetchBtn").click(searchHandler);
$("#randomFetchBtn").click(searchHandler);
$("#triviaBtn").click(searchHandler);
$("#clearBtn").click(clearStorage);