// SIGNIN / SIGNUP FORM
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const signUpButtons = document.querySelectorAll(".sign-up-btn");
const loginButtons = document.querySelectorAll(".login-btn");
const backLayer = document.querySelector(".back-layer");

signUpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    backLayer.style.clipPath = "inset(0 0 0 50%)";
  });
});

loginButtons.forEach((button) => {
  button.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    backLayer.style.clipPath = "";
  });
});

// BLOG APP
// let fname = document.getElementById("f-name").value
// let lname = document.getElementById("l-name").value
// let email = document.getElementById("semail").value
// let password = document.getElementById("spassword").value

// function signup() {
//     let tempuser = {
//         'fname': 'fname',
//         'lname': 'lname',
//         'email': 'semail',
//         'password': 'spassword',
//     }
//     let len = users.length;

//     for (var i = 0; i < len; i++){
//         if (tempuser) {

//         }
//     }
// }

// let users = [];

// let get = JSON.parse(localStorage.getItem('user'));
// users = [get];
// users.push(user)

// localStorage.setItem('user', JSON.stringify(users));

let users = JSON.parse(localStorage.getItem("users")) || [];

// SIGNUP FUNCTION
function signup() {
  let fname = document.getElementById("f-name").value.trim();
  let lname = document.getElementById("l-name").value.trim();
  let email = document.getElementById("semail").value.trim().toLowerCase();
  let password = document.getElementById("spassword").value;

  if (!fname || !lname || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  let exists = users.some((user) => user.email === email);
  if (exists) {
    alert("User already exists!");
    return;
  }

  let newUser = { fname, lname, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
}

// LOGIN FUCNCTION
function login() {
  let email = document.getElementById("lemail").value.trim().toLowerCase();
  let password = document.getElementById("lpassword").value;

  let user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    window.location.href = "blog.html";
  } else {
    alert("Invalid email or password");
  }
}

// BLOG PAGE FUNCTION
const user = JSON.parse(localStorage.getItem("loggedInUser"));

// Redirect if not logged in
document.getElementById("username").innerText = user.fname + " " + user.lname;

// BLOG SHOW FUNCTION
function showBlogCard(blog, index) {
  const cardsContainer = document.querySelector(".cards");

  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";

  card.innerHTML = `
    <img src="${
      blog.img || "./assets/placeholder.jpg"
    }" class="card-img-top" alt="Blog Image">
    <div class="card-body">
      <h5 class="card-title">${blog.title}</h5>
      <p class="card-text">${blog.content}</p>
      <p class="text-muted" style="font-size: 0.8rem;">Posted by ${
        blog.author
      }<br>${blog.createdAt}</p>
      <button class="btn btn-danger btn-sm" onclick="deleteBlog(${index})">Delete</button>
    </div>
  `;

  cardsContainer.appendChild(card);
}

// BLOG ADD FUNCTION
function addBlog() {
  console.log("addBlog function just ran");

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("You must be logged in to post a blog.");
    return;
  }

  let title = document.getElementById("blog-title").value.trim();
  let content = document.getElementById("blog-content").value.trim();
  let imgInput = document.getElementById("blog-img");

  if (!title || !content) {
    alert("Please fill in all blog fields");
    return;
  }

  let file = imgInput.files[0];
  let imageUrl = file ? URL.createObjectURL(file) : "./assets/placeholder.jpg";

  let blog = {
    author: loggedInUser.email.toLowerCase(),
    title,
    content,
    img: imageUrl,
    createdAt: new Date().toLocaleString(),
  };

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));

  showBlogCard(blog);

  // Reset form
  document.getElementById("blog-title").value = "";
  document.getElementById("blog-content").value = "";
  imgInput.value = "";

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModalCenter")
  );
  modal.hide();

  alert("Blog posted successfully!");
}

// SHOW ALL BLOGS ON PAGE RELOAD
window.addEventListener("DOMContentLoaded", () => {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.reverse().forEach(showBlogCard);
});

// BLOG DELETE FUNCTION
function deleteBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderAllBlogs(); // refresh all cards
}

// SHOW CURRENT SAVED BLOGS
function renderAllBlogs() {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.forEach((blog, index) => showBlogCard(blog, index));
}

window.addEventListener("DOMContentLoaded", renderAllBlogs);
