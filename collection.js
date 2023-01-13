let yourCollection = {};
//save the session storage to your collection
Object.keys(sessionStorage).forEach((key) => {
    yourCollection[key] = sessionStorage.getItem(key);
});





//////Import a file

//get the file input
let fileInput = document.querySelector(".user-file")

fileInput.onchange = (e) => { 
    let userFile = e.target.files[0]; 
    console.log(userFile.type)
    if (userFile.type !== 0){

    }
}

//on click, take on a file
fileInput.click();


//////Export a file
