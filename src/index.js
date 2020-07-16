let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  let submitButton = document.getElementById('toy-form');

  submitButton.addEventListener('submit', event => newToy(event));
  debugger
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys() {
   
  fetch('http://localhost:3000/toys/')
    .then(response => response.json())
    .then(data => displayToys(data));

}

function displayToys(data) {
  const toyCollection = document.getElementById("toy-collection");
  data.forEach(element => {
    console.log(element.name);
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
    <h2>${element.name}</h2>
    <img alt="toy picture"
    src= "${element.image}" class="toy-avatar" />
    <p>this toy has ${element.likes} likes </p>
    <button class="like-btn">click to like</button>
    `
    toyCollection.append(toyCard);
  });
}

 
function newToy(e){
  
  e.preventDefault();
  let getForm = document.querySelector('form');
  fetch('http://localhost:3000/toys/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: getForm.name.value,
      image: getForm.image.value,
      likes: 0
    })
  });
}

