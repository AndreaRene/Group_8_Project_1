drop down selector by name or ingredient (on load)
    two different apis
    use if else based on drop down field
    selector needs unique id

    $("#searchCriteria")

    on click
    if searchCriteria value is Cocktail Name
    return resutls based on by name api call
    else
    return results based on by ingredient api call

        see userInput

search field (on load)
    input needs unique id

    $("#userInput")

    on click
    use userInput as value in api call

        see displayResults

displayResults function
populate (up to) four search results in buttons (dynamic)
    empty div
    needs unique id

    $("#resultBtns")

    if there are more than one result
    using for loop, display up to 4 results as buttons from api call (fetchBtn) 
    else display recipe info (recipeName, ingredients, instrucions, cocktailImg)

coctail img may need another api call

    if so, use userInput as search value in api call
    if one result, display img
    if more than one, match image to recipe chosen in results list and display the match
populate image based on recsult selected (recipe image fetch)
    empty img tag
    needs unique id

    $("#cocktailImg")

    dynamically changing the source of the image

search button (by name fetch or by ingredient fetch)
    button needs unique id

    $("#fetchBtn")

random button (random fetch)
    button needs unique id

    $("#randomFetchBtn")

populate li's with ingredients based on result selected (dynamic)
    empty div
    needs unique id

    $("#ingredients")
    use for loop to populate ingredients?

populate instructions based on result selected (dynamic)
    empty div
    needs unique id

    $("#instructions")

        wrap $("#ingredients") and $("#instructions") in section $("#recipe")



store search history (localStorage)

populate (up to) five most recent searches into buttons (dynamic)
    empty div
    needs unique id

    $("#searchHistory")

clear history button (on load)
    clear local storage and empty searchHistory div
    needs unique id

    $("#clearBtn")

try out trivia button (on load)
    loads question and answer
    needs unique id

    $("#triviaBtn")
    

populate trivia question (dynamic)
    empty div
    needs unique id

    $("#triviaQ")

populate 4 buttons with answer text (dynamic)
    empty div
    needs unique id

    $("#triviaA")

use for loop and push to get correct and incorrect answers into an array
randomize answers as the buttons are created(using another loop) 

classify 1 correct and 3 incorrect

if correct, green, else red

