var getCocktail = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php"


var searchHandler = function (event) {
    event.preventDefault();
    if ($(this).attr("id") === "fetchBtn") {
        var userInput = $("#drinkSearch").val();
        console.log(userInput);
        search(userInput);
    } else {
        random();
    };
};

function search(userInput) {
    fetch(getCocktail + userInput)
        .then((response) => {
            console.log("BY NAME COCKTAIL", response);
            return response.json();
        }).then((data) => {
            console.log("BY NAME COCKTAIL", data);
        });
};

function random() {
    fetch(getRandomCocktail)
        .then((response) => {
            console.log("RANDOM COCKTAIL", response);
            return response.json();
        }).then((data) => {
            console.log("THERE", data);
        });
};

function trivia() {
    fetch("https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=1&difficulty=easy&tags=alcohol,cocktails")
        .then((response) => {
            console.log("TRIVIA RESPONSE", response);
            return response.json();
        }).then((data) => {
            console.log("TRIVIA DATA", data);
        });
}

$("#fetchBtn").click(searchHandler);
$("#randomFetchBtn").click(searchHandler);
