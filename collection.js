let yourCollection = {};

//save the session storage to your collection
Object.keys(sessionStorage).forEach((key) => {
    yourCollection[key] = sessionStorage.getItem(key);
});

console.log(yourCollection)


//////Import a file

//get the file input
let fileInput = document.querySelector(".user-file")

fileInput.onchange = (event) => { 
    let userFile = event.target.files[0]; 
    console.log(userFile.type)
    //make sure its a text file
    if (userFile.type !== "text/plain"){
        //send wrong file tpye message and remove the file
        window.alert("Please submit a valid text file");
        fileInput.value= "";
    } else {
        //create a file reader
        const reader = new FileReader();
        reader.readAsText(userFile, "UTC-8");
        //tell the file reader what to do once it loads
        reader.onload = (readEvent) => {
            //get the json from the text file and assign it to my collection
            yourCollection = JSON.parse(readEvent.target.result);
            //set the session storage to the imported collection;
            sessionStorage = yourCollection;

            console.log(yourCollection, sessionStorage)
            
        }

        
    }

}




//////Export a file

//get the download link
const downloadLink = document.querySelector(".download-file");

//put the content inside the file, as a string
const collectionFile = new Blob([JSON.stringify(yourCollection)], {type: "text/plain"});

//add the file
downloadLink.href = URL.createObjectURL(collectionFile);

//set the name of the file
downloadLink.download = "collection.txt";


    



 
    

  

