drop down selector by name or ingredient (on load)
    two different apis
    use if else based on drop down field
    selector needs unique id

    $("#searchCriteria")

search field (on load)
    input needs unique id

    $("#userInput")

search button (by name fetch or by ingredient fetch)
    button needs unique id

    $("#fetchBtn")

random button (random fetch)
    button needs unique id

    $("#randomFetchBtn")

populate (up to) four search results in buttons (dynamic)
    empty div
    needs unique id

    $("#resultBtns")

populate li's with ingredients based on result selected (dynamic)
    empty div
    needs unique id

    $("#ingredients")

populate instructions based on result selected (dynamic)
    empty div
    needs unique id

    $("#instructions")

        wrap $("#ingredients") and $("#instructions") in section $("#recipe")

populate image based on recsult selected (recipe image fetch)
    empty img tag
    needs unique id

    $("#cocktailImg")

    dynamically changing the source of the image

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

classify 1 correct and 3 incorrect

if correct, green, else red

