var getCocktail = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";


var searchHandler = function (event) {
    event.preventDefault();
    if ($(this).attr("id") === "fetchBtn") {
        var userInput = $("#drinkSearch").val();
        console.log(userInput);
        search(userInput);
    };
};

function search(userInput) {
    fetch(getCocktail + userInput)
        .then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            console.log("HERE", data);
        });
};

function random() {


};

$("#fetchBtn").click(searchHandler);
$("#fetchRandomBtn").click(random);