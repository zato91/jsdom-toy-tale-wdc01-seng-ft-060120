let addToy = false;

const BASE_URL = `http://localhost:3000/`
const TOYS_URL = BASE_URL + 'toys/'

document.addEventListener("DOMContentLoaded", () => {
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

  // Grab the toy form using its class, then use index 0 since it will be in an array
  const toyForm = document.getElementsByClassName('add-toy-form')[0]

  toyForm.addEventListener('submit', (event)=> {
    // pass in the event to stop the default action
    event.preventDefault()

    // grab the values from the input fields on the form
    let toyName = toyForm.name.value
    let toyImage = toyForm.image.value

    // pass the information to the function that will make the fetch request
    handleNewToyFormSubmit(toyName, toyImage)

    // reset the forms fields back to default
    toyForm.reset()
  })

  // grab my toys as soon as the page finishes loading
  fetchToys()
});

function fetchToys() {
  fetch(TOYS_URL)
  .then( res => res.json() )
  .then( toys => renderAllToys(toys) )
  // pass the toys to a function to render all of them
}

function renderAllToys(toys) {
  // iterate through the array of toys to render each one individually
  toys.forEach( toy => renderToy(toy) )
}

function renderToy(toy) {

  // get the div to append the toy cards to
  let toyCollection = document.getElementById('toy-collection')

  let div = document.createElement('div')
  div.className = 'card'
  toyCollection.appendChild(div)

  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  div.appendChild(h2)

  let img = document.createElement('img')
  img.classList += 'toy-avatar'
  img.src = toy.image
  div.appendChild(img)

  let p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`
  div.appendChild(p)

  let deleteButton = document.createElement('button')
  deleteButton.textContent = 'x'
  div.appendChild(deleteButton)

  let likeButton = document.createElement('button')
  likeButton.textContent = 'Like <3'
  likeButton.classList += 'like-btn'
  div.appendChild(likeButton)

  




  // since we have access to the toy and the 'p' tag that will get updated
  // with the likes, we can pass them into the function that will increase
  // the likes so we don't have to grab them again using the DOM  ^_^
  likeButton.addEventListener('click', ()=> increaseLikes( toy, p ) )
  
  deleteButton.addEventListener('click', ()=> deleteToy(toy,div) )

}

function handleNewToyFormSubmit(toyName, toyImage) {

  // we can make our request object and then pass it to fetch
  let postRequest = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  }

  fetch(TOYS_URL, postRequest)
  .then( res => res.json() )
  .then( toy => renderToy(toy) )
}

function increaseLikes( toy, p ) {
  

  let putRequest = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      // name: toy.name,
      // image: toy.image,
      likes: toy.likes += 1
    })
  }

  fetch(TOYS_URL + toy.id, putRequest)
  .then( res => res.json() )
  .then( toy => p.textContent = `${toy.likes} Likes` )
  // we can update the likes in the 'p' tag since we passed it into the function earlier
}


function deleteToy(toy,div){


  fetch(TOYS_URL + toy.id, {
    method: 'delete'
  })
    .then(response => response.json())
    
    div.remove();
}

// document.addEventListener("DOMContentLoaded", () => {
  
  
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

//   let submitButton = document.getElementById('toy-form');

//   submitButton.addEventListener('submit', (e) =>  {
     
//   e.preventDefault();

//   newToy();
//   submitButton.reset();
// })
// fetchToys();


// });

//   function displayToys(element) {
//     const toyCollection = document.getElementById("toy-collection");
    
      
//       const toyCard = document.createElement("div");
//       toyCard.className = "card";
//       toyCard.innerHTML = `
//       <h2>${element.name}</h2>
//       <img alt="toy picture"
//       src= "${element.image}" class="toy-avatar" />
//       <p>this toy has ${element.likes} likes </p>
//       <button id="${element.id}">click to like</button>
//       `

//       toyCollection.append(toyCard);

//       let button = document.querySelector('button')

      
//       console.log(button);




    
//   }

// function fetchToys() {
   
//   fetch('http://localhost:3000/toys/')
//     .then(response => response.json())
//     .then(data => data.forEach( element => displayToys(element)));

// }



 
// function newToy(){
  
  
//   let getForm = document.querySelector('form');
//   fetch('http://localhost:3000/toys/', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name: getForm.name.value,
//       image: getForm.image.value,
//       likes: 0
//     })

//   })
//   .then(response => response.json())
//   .then(toy => displayToys(toy));

  
// }

// let likeus = document.querySelectorAll('.like-btn')
// likeus.addEventListener('submit', (e) =>  {
     

// console.log('hello')
// })

