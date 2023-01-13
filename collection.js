let yourCollection = {};
Object.keys(sessionStorage).forEach((key) => {
    yourCollection[key] = sessionStorage.getItem(key);
});