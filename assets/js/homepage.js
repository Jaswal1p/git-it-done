let getUserRepos = function(user) {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
    
};

getUserRepos("Twitter"); 


let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

let formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
};