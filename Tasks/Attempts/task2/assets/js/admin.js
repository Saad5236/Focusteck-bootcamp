const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let userProjectsData = JSON.parse(localStorage.getItem("userProjectsData"));
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// __________CHECKING LOGIN & LOGOUT__________

// const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const navbarLogoutBtn = document.querySelector(".navbar-logout-btn");

if (loggedInUser && loggedInUser.userRole === "admin") {
  console.log("userLoggedIn", loggedInUser);
} else {
  window.location.href = "./authentication.html";
}

navbarLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "./authentication.html";
});

// _________________________

const refreshUserProfile = () => {
  document.querySelector(".hero-user-name").innerText = user.userName;
  document.querySelector(".hero-user-profession").innerText =
    user.userProfession;
  document.querySelector(".about-me-text p").innerText = user.userAbout;
  // document.querySelector(
  //   ".about-me-user-image"
  // ).innerHTML = `<img src=${user.userImgSrc} alt="" />`;

  const image = new Image();
  image.src = user.userImgSrc;
  document.querySelector(
    ".about-me-user-image"
  ).innerHTML = ""
  document.querySelector(
    ".about-me-user-image"
  ).appendChild(image)
};

refreshUserProfile();

// _________PROFILE____________

let updatePortfolioModal = document.querySelector("#update-portfolio-modal");
let updatePortfolioModalForm = document.querySelector(
  "#update-portfolio-modal form"
);
let updatePortfolioBtn = document.querySelector(".update-profile-btn");
let updatePortfolioModalClose = document.querySelector(
  ".update-portfolio-close-btn"
);

let updateUserNameInput = document.querySelector(".update-portfolio-user-name");
let updateUserNumberInput = document.querySelector(
  ".update-portfolio-user-number"
);
let updateUserAboutInput = document.querySelector(
  ".update-portfolio-user-about"
);
let updateUserEmailInput = document.querySelector(
  ".update-portfolio-user-email"
);
let updateUserPasswordInput = document.querySelector(
  ".update-portfolio-user-password"
);
let updateUserProfessionInput = document.querySelector(
  ".update-portfolio-user-profession"
);
let updateUserImgSrcInput = document.querySelector(".update-portfolio-img-src");

updatePortfolioBtn.addEventListener("click", (e) => {
  updateUserNameInput.value = user.userName || "";
  updateUserNumberInput.value = user.userNumber || "";
  // updateUserImgSrcInput.value = user.userImgSrc || "";
  updateUserAboutInput.value = user.userAbout || "";
  updateUserEmailInput.value = user.userEmail || "";
  updateUserPasswordInput.value = user.userPassword || "";
  updateUserProfessionInput.value = user.userProfession || "";

  updatePortfolioModal.showModal();
});

updatePortfolioModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  user.userName = updateUserNameInput.value;
  user.userNumber = updateUserNumberInput.value;
  user.userEmail = updateUserEmailInput.value;
  user.userPassword = updateUserPasswordInput.value;
  user.userProfession = updateUserProfessionInput.value;
  user.userAbout = updateUserAboutInput.value;
  // user.userImgSrc = updateUserImgSrcInput.value;
  let userPortfolioImg = updateUserImgSrcInput.files[0]
  if(userPortfolioImg) {
    user.userImgSrc = URL.createObjectURL(userPortfolioImg);
  }

  let allUsersData = JSON.parse(localStorage.getItem("usersData"));
  console.log("allusersdata", user, allUsersData);
  allUsersData = allUsersData.filter(
    (userData) => userData.userId !== user.userId
  );
  console.log("allusersdata", user, allUsersData);
  allUsersData.push(user);
  localStorage.setItem("usersData", JSON.stringify(allUsersData));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  refreshUserProfile();
});

updatePortfolioModalClose.addEventListener("click", (e) => {
  updatePortfolioModal.close();
});


// ________NAVIGATIONS HANDLE________