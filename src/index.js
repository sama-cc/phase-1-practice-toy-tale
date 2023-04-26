let addToy = false;

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
});

// alert called when fetch fails

const sendAlert = () => alert("There was an error. Please try again.")

// handles "like" fetch operation

const handleLike = (e) => {
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      likes: parseInt(e.target.previousSibling.innerText) + 1
    })
  })
  .then(resp => resp.json())
  .then(data => {
    e.target.previousSibling.innerText = `${data.likes} Likes`
  })
  .catch(sendAlert);
}

// handles card generation

const createCard = (toy) => {
  card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>${toy.name}</h2><img src="${toy.image}" class="toy-avatar" /><p>${toy.likes} Likes</p><button class="like-btn" id="${toy.id}">Like ❤️</button>`;
  document.getElementById("toy-collection").appendChild(card);
  document.getElementById(toy.id).addEventListener("click", handleLike)
}

// creates new card based on submitted form data

document.querySelector(".add-toy-form").addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: `${document.querySelectorAll(".add-toy-form input")[0].value}`,
      image: `${document.querySelectorAll(".add-toy-form input")[1].value}`,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(createCard)
  .catch(sendAlert);
})

// generates cards for all pre-existing toys in the JSON database

fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(data => data.forEach(createCard))
.catch(sendAlert)