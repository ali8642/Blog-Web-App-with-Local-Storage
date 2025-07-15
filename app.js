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
if (!user) {
  alert("You're not logged in!");
  window.location.href = "index.html";
} else {
  document.getElementById("username").innerText = user.fname + " " + user.lname;
}

function addBlog() {
  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("You must be logged in to post a blog.");
    return;
  }

  let title = document.getElementById("blog-title").value.trim();
  let content = document.getElementById("blog-content").value.trim();

  if (!title || !content) {
    alert("Please fill in all blog fields");
    return;
  }

  let blog = {
    author: loggedInUser.email.toLowerCase(),
    title: title,
    content: content,
    createdAt: new Date().toLocaleString(),
  };

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  alert("Blog posted successfully!");
}
