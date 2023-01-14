//get the dropdown box from the amiibo.html file
const amiiboSeries = document.getElementById("series-box");

//set the base URL
let amiiboURL = "https://amiiboapi.com/api/amiibo/";

//get the div where the results will go
let amiiboResults = document.querySelector(".amiibo-results");




//get the list of amiibo series
fetch("https://amiiboapi.com/api/amiiboseries/")
    .then((res) =>{
        return res.json()
    })
    .then((res) => {
        //sort the amiibo series' by name and assign to a variable
        let amiiboSeriesArr = res.amiibo.sort((a, b) => {
            return (a.name < b.name ? -1 : 1);
            //filter out duplicate entry in API json
            //(there were 2 entries for splatoon)
        }).filter((word, i, arr) => {
            if (i === 0) {
                return word;
            } else if (word.name !== arr[i-1].name){
                return word;
            }
            
        })
        //
        for (series of amiiboSeriesArr) {
            //create a new option element
            const option = document.createElement("option");
            //set the options value
            option.value = series.name;
            //set the options innertext
            option.innerText = series.name;
            //append the option
            amiiboSeries.append(option);
        }
    })

//set the forms submit event
document.querySelector(".amiibo-search").addEventListener("submit", async (event) => {
    event.preventDefault();

    //assign the values of the text input and the dropdown box to variables
    const charaName = event.target.character.value;
    const seriesName = event.target.series.value;

    //reset the text box
    event.target.character.value = ""
    event.target.series.value = "Select the series"

    //if theres not text of dropdown selection
    if (!charaName && seriesName === "Select the series") {
        window.alert("Please enter a name or select a series!");
        return;

        //if theres text and dropdown selection
    } else if (charaName && seriesName !== "Select the series") {
        amiiboURL += `?character=${charaName}&?amiiboSeries=${seriesName}`
        

        //if theres a character name but no series name
    } else if (charaName && seriesName === "Select the series") {
        amiiboURL += `?character=${charaName}`

        //if theres a series name but no character name
    } else {
        amiiboURL += `?amiiboSeries=${seriesName}`
    }

    await fetch(amiiboURL)
    //get the data
        .then((res) => {
            //check the status code
            if (res.status === 404) {

                //reset the div
                amiiboResults.innerHTML = "";

                //create p tag for no results found message
                let noAmiibosP = document.createElement("p.no");
                noAmiibosP.className = "no"
                noAmiibosP.innerText = "No search results found. \n  Please use exact spelling for Character Name or search by Amiibo Series instead.";

                amiiboResults.append(noAmiibosP);


            } else {

                console.log("fetch was successful")
                return res.json()
            }
        }) 
        
        .then((response) => {
            //if the response isnt undefined
            if (response){
                //reset the div
                amiiboResults.innerHTML = "";

                //loop through the amiibos
                for (amiibo of response.amiibo) {
                    //create an article for the amiibo
                    const amiiboArticle = document.createElement("article");
                    //create the image element
                    const amiiboImg = document.createElement("img");
                    amiiboImg.src = amiibo.image;
                    amiiboImg.alt = amiibo.name;
                    //append the image to the article 
                    amiiboArticle.append(amiiboImg);

                    //create a form, input, and button
                    const quantityForm = document.createElement("form");
                    const quantityInput = document.createElement("input");
                    const collectButton = document.createElement("button");

                    quantityInput.type = "number"
                    quantityInput.placeholder = "Quantity"
                    collectButton.type = "submit"
                    collectButton.innerText = "Add to Collection"
                    quantityForm.append(quantityInput)
                    quantityForm.append(document.createElement("br"))
                    quantityForm.append(collectButton)

                    //get the amiibos id
                    const amiiboId = `AMIIBO-${amiibo.head}${amiibo.tail}`
                    const amiiboName = amiibo.name

                    //add an event to the form
                    quantityForm.addEventListener("submit", (event) => {
                        event.preventDefault();

                        //check if the value isnt 0
                        if (quantityInput.value > 0) {

                        //set a key value pair for the amiibo id and the quantity and save to session storage
                        sessionStorage.setItem(amiiboId, `${quantityInput.value}`)

                        console.log(sessionStorage)

                        window.alert(`You have added ${quantityInput.value} ${amiiboName} to your collection.`)
                        quantityInput.value = "";

                        } else {
                            //alert message
                            window.alert("Please enter a number greater than 0.")
                        }
                    })

                    //append the form to the article
                    amiiboArticle.append(quantityForm);

                    //append the article  to the results div
                    amiiboResults.append
                    (amiiboArticle);
                    
                    //set the articles class to hidden
                    amiiboArticle.className = "hidden";


                }
                //////Pages
                
                const amiiboArticleArr = amiiboResults.querySelectorAll("article");

                //call the pages function
                pages(current, amiiboArticleArr, amiiboPerPageLimit);

            }


        })
        .catch((err) => {
            console.log(err)
        })

    //reset the url to base
    amiiboURL = "https://amiiboapi.com/api/amiibo/";

})