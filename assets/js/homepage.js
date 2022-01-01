let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");


let getUserRepos = function(user) {
    // format the github api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    
    fetch(apiUrl).then(function(response) {
        // check if api returned any repos
        if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
  }
        
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
           });
       }
       else {
           alert("Error: GitHub user Not Found");
       }

    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
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

       // create a status element
       let statusEl = document.createElement("span");
       statusEl.classList = "flex-row align-center";

       // check if current repo has issues or not
       if (repos[i].open_count > 0) {
           statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
       }
       else {
           statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
       }   
       
       // append to container
       repoEl.appendChild(statusEl);

       // append container to the dom
       repoContainerEl.appendChild(repoEl);
   } 
};



// getUserRepos("Twitter"); 