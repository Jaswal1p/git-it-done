let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


let getUserRepos = function(user) {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    });
    
};


let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");

let formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);

let displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

   // loop over repos
   for (let i = 0; i < repos.length; i++) {
       // format repo name
       let repoName = repos[i].owner.login + "/" + repos[i].name;

       // create a container for each repo
       let repoEl = document.createElement("div");
       repoEl.classList = "list-item flex-row justify-space-between align-center";

       // create a span element to hold repository name
       let titleEl = document.createElement("span");
       titleEl.textContent = repoName;

       // append to container
       repoEl.appendChild(titleEl);

       // append container to the dom
       repoContainerEl.appendChild(repoEl);
   } 
};



// getUserRepos("Twitter"); 