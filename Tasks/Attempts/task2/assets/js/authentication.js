// ___________LOGIN SIGNUP SWITCH___________

const loginFormSection = document.querySelector(".login-form-section");
const signupFormSection = document.querySelector(".signup-form-section");
const loginSignupBtn = document.querySelector(".login-signup-btn");
const signupLoginBtn = document.querySelector(".signup-login-btn");

loginSignupBtn.addEventListener("click", () => {
  loginFormSection.style.display = "none";
  signupFormSection.style.display = "grid";
});

signupLoginBtn.addEventListener("click", () => {
  signupFormSection.style.display = "none";
  loginFormSection.style.display = "grid";
});

// ___________FUNCTIONS___________

const generateId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    if (userProjectsData.find((i) => i.projectId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

// _________SIGNUP USER IN LOCAL STORAGE__________

const signupForm = document.querySelector(".signup-form-section form");
const signupFormBtn = document.querySelector(".signup-form-section form button");
const signupFormData = new FormData(signupForm, signupFormBtn); // to fetch signup form data


signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  
  let newUserData = {
    userId: generateId(),
    userName: signupFormData.get("signup-fullname"),
    userNumber: signupFormData.get("signup-phonenumber"),
    userEmail: signupFormData.get("signup-email"),
    userPassword: signupFormData.get("signup-password"),
  }

  if(localStorage.getItem("usersData") === null) {
    let usersData = [];
    usersData.push(newUserData);
    localStorage.setItem("usersData", JSON.stringify(usersData));
  } else {
    let usersData = JSON.parse(localStorage.getItem("usersData"));
    usersData.push(newUserData)
    localStorage.setItem("usersData", JSON.stringify(usersData));
  }
})

// _________LOGIN USER IN LOCAL STORAGE__________

const loginForm = document.querySelector(".login-form-section form");
const loginFormBtn = document.querySelector(".login-form-section form button");
const loginFormData = new FormData(loginForm, loginFormBtn); // to fetch login form data

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  
})