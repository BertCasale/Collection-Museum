//function for creating page
function pages(startPage, elemArr, countPerPageLimit){
    
    //calculate max page number
    const maxPages = Math.ceil(elemArr.length/countPerPageLimit);
    const pageNumbersDiv = document.getElementById("pagination-numbers");
    pageNumbersDiv.innerHTML = "";
    //loop to make page buttons
        for (let page = 1; page <= maxPages; page++){
            //create a button
            const pageNumberButton = document.createElement("button")
            
            //set the buttons text to page number
            pageNumberButton.textContent = page;
            pageNumberButton.value = page;
            pageNumberButton.className = "pagination-button"

            //add click events for each button
            pageNumberButton.addEventListener("click", () => {
                currentPageFunc(page, elemArr, countPerPageLimit)
            }) 

            
            pageNumbersDiv.append(pageNumberButton)
        }
        currentPageFunc(startPage, elemArr, countPerPageLimit);
    
}

function currentPageFunc(currentPage, arr, countPerPageLimit){
    //get all the current elements
    const currentArticles = document.querySelectorAll(".current") 
    //loop through the current articles and set the class to hidden
    for (article of currentArticles) {
        article.className = "hidden";
    }

    //loop up to the page limit based on the page number
    for(i = (0 + ((currentPage - 1)* countPerPageLimit)); i < (countPerPageLimit + ((currentPage - 1)* countPerPageLimit)) && i < arr.length; i++) {
        //set the elemnts on that page to current
        arr[i].className = "current"
    }
}
//set current to 1, so the first page will always show first
let current = 1;

//set the limit of items on each page
const amiiboPerPageLimit = 20;
