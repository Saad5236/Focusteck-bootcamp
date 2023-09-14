

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
    let usersData = JSON.parse(localStorage.getItem("usersData"));

    if (usersData && usersData.find((i) => i.userId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

// _________SIGNUP USER IN LOCAL STORAGE__________

const signupForm = document.querySelector(".signup-form-section form");
const signupFormBtn = document.querySelector(
  ".signup-form-section form button"
);

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const signupFormData = new FormData(signupForm, signupFormBtn); // to fetch signup form data

  if (
    signupFormData.get("signup-fullname") === "" ||
    signupFormData.get("signup-phonenumber") === "" ||
    signupFormData.get("signup-email") === "" ||
    signupFormData.get("signup-password") === ""
  ) {
    alert("Some input fields are still empty. Fill them and try again.");
  } else {
    // if all fields are filled

    let allUsersData = JSON.parse(localStorage.getItem("usersData"));

    if (
      !allUsersData ||
      (allUsersData &&
        !allUsersData.find(
          (data) => data.userEmail === signupFormData.get("signup-email")
        ))
    ) {
      let newUserData = {
        userId: generateId(),
        userRole: "user", // alternatively admin
        userName: signupFormData.get("signup-fullname"),
        userNumber: signupFormData.get("signup-phonenumber"),
        userEmail: signupFormData.get("signup-email"),
        userPassword: signupFormData.get("signup-password"),
        userProfession: "",
        userAbout: "",
        userImgSrc: "",
        userSkills: [],
      };

      console.log(newUserData);

      let usersData;

      if (localStorage.getItem("usersData") === null) {
        usersData = [
          {
            userId: 1,
            userRole: "admin", // alternatively admin
            userName: "Saad",
            userNumber: "89389236",
            userEmail: "d@d.com",
            userPassword: "d",
            userProfession: "Admin",
            userAbout:
              "I am new admin. I am new admin. I am new admin. I am new admin. I am new admin. I am new admin. I am new admin. I am new admin",
            userImgSrc: "assets/images/about-me-img.jpg",
            userSkills: [],
          },
        ];
        localStorage.setItem("userProjectsData", JSON.stringify([]));
        localStorage.setItem("userEducationsData", JSON.stringify([]));
        localStorage.setItem("userExperiencesData", JSON.stringify([]));
        localStorage.setItem(
          "usersData",
          JSON.stringify(usersData)
        );
      } else {
        usersData = JSON.parse(localStorage.getItem("usersData"));
      }
      usersData.push(newUserData);
      localStorage.setItem("usersData", JSON.stringify(usersData));
      localStorage.setItem("loggedInUser", JSON.stringify(newUserData));

      window.location.href = "./index.html";
    } else {
      alert("email already exists");
    }
  }
});

// _________LOGIN USER IN LOCAL STORAGE__________

const loginForm = document.querySelector(".login-form-section form");
const loginFormBtn = document.querySelector(".login-form-section form button");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginFormData = new FormData(loginForm, loginFormBtn); // to fetch login form data

  let usersData = localStorage.getItem("usersData");
  let loginFormDataEmail = loginFormData.get("login-email");
  let loginFormDataPassword = loginFormData.get("login-password");

  if (usersData !== null) {
    usersData = JSON.parse(usersData);

    if (loginFormDataEmail === "" || loginFormDataPassword === "") {
      alert("One or more fields are empty. Fill them and try again.");
    } else {
      let loggedInUser = usersData.find(
        (user) =>
          user.userEmail === loginFormDataEmail &&
          user.userPassword === loginFormDataPassword
      );
      if (loggedInUser) {
        console.log("user logged in", loggedInUser);
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        if (loggedInUser.userRole === "admin") {
          window.location.href = "./index1.html";
        } else {
          window.location.href = "./index.html";
        }
      } else {
        alert("Your email or password or both are incorrect.");
      }
    }
  } else {
    alert("No data in database in backend. Sign up first.");
  }
});
