let yourCollection = {};

//save the session storage to your collection
Object.keys(sessionStorage).forEach((key) => {
    yourCollection[key] = sessionStorage.getItem(key);
});

console.log(yourCollection)


//////Import a file

//get the file input


let fileInput = document.querySelector(".user-file")

fileInput.onchange = (e) => { 
    let userFile = e.target.files[0]; 
    console.log(userFile.type)
    //make sure its a text file
    if (userFile.type !== "text/plain"){
        window.alert("Please submit a valid text file");
        fileInput.value= "";
    }

}

//on click, take in a file
fileInput.click();


//////Export a file


    //get the download link
    const downloadLink = document.querySelector(".download-file");

    //put the content inside the file, as a string
    const collectionFile = new Blob([JSON.stringify(yourCollection)], {type: "text/plain"});

    //add the file
    downloadLink.href = URL.createObjectURL(collectionFile);

    //set the name of the file
    downloadLink.download = "collection.txt";


    



 
    

  

