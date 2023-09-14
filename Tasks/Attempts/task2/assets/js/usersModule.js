// __________CHECKING LOGIN & LOGOUT__________

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const navbarLogoutBtn = document.querySelector(".navbar-logout-btn");

if (loggedInUser && loggedInUser.userRole === "admin") {
  console.log("userLoggedIn", loggedInUser);
} else {
  window.location.href = "./authentication.html";
}

// navbarLogoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("loggedInUser");
//   window.location.href = "./authentication.html";
// });

// ___________CREATE ADMIN/USER___________

const refreshUsers = (filteredUsers) => {
  allUsersContainer.innerHTML = "";

  filteredUsers.forEach((user) => {
    let newUserContent = `<h3 class="user-name">${user.userName}</h3>
        <div class="user-email">Email: <span>${user.userEmail}</span></div>
        <div class="user-role">Role: <span>${user.userRole}</span></div>
        <div class="user-number">Phone no: <span>${user.userNumber}</span></div>
        <div class="user-btns">
            <button class="user-delete">Delete</button>
            <button class="user-update">Update</button>
        </div>`;

    let userContainer = document.createElement("div");
    userContainer.classList.add("user");
    userContainer.id = user.userId;
    userContainer.innerHTML = newUserContent;

    allUsersContainer.appendChild(userContainer);

    // DELETE FUNCTIONALITY
    const userDeleteBtn = userContainer.querySelector(".user-delete");
    userDeleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let userId = userDeleteBtn.parentNode.parentNode.id;
      console.log("chidvochd", allUsersData);
      allUsersData = allUsersData.filter(
        (user) => user.userId !== Number(userId)
      );
      allUsersProjects = allUsersProjects.filter(
        (project) => project.userId === Number(userId)
      );

      localStorage.setItem("usersData", JSON.stringify(allUsersData));
      localStorage.setItem(
        "userProjectsData",
        JSON.stringify(allUsersProjects)
      );

      console.log("chidvochd", allUsersData);

      refreshUsers(allUsersData);
    });

    // UPDATE FUNCTIONALITY
    const updateUserBtn = userContainer.querySelector(".user-update");
    updateUserBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("userid", user.userId);

      document.querySelector("#update-fullname").value = user.userName;
      document.querySelector("#update-phonenumber").value = user.userNumber;
      document.querySelector("#update-email").value = user.userEmail;
      document.querySelector("#update-password").value = user.userPassword;

      updateUserModal.showModal();
    });

    updateUserModalForm.addEventListener("form", (e) => {
    //   const addUserFormFields = new FormData(
    //     addUserModalForm,
    //     addUserModalFormBtn
    //   ); // to fetch signup form data
    //   const addUserName = addUserFormFields.get("signup-fullname");
    //   const addUserEmail = addUserFormFields.get("signup-email");
    //   const addUserNumber = addUserFormFields.get("signup-phonenumber");
    //   const addUserPassword = addUserFormFields.get("signup-password");
    //   const addUserRole = addUserFormFields.get("signup-role");

    //   if (
    //     addUserName === "" ||
    //     addUserEmail === "" ||
    //     addUserNumber === "" ||
    //     addUserPassword === ""
    //   ) {
    //     alert("Some input fields are still empty. Fill them and try again.");
    //   } else {
    //     if (
    //       allUsersData &&
    //       !allUsersData.find((data) => data.userEmail === addUserEmail)
    //     ) {
    //       let newUserData = {
    //         userId: generateId(),
    //         userRole: addUserRole, // alternatively admin
    //         userName: addUserName,
    //         userNumber: addUserNumber,
    //         userEmail: addUserEmail,
    //         userPassword: addUserPassword,
    //         userProfession: "",
    //         userAbout: "",
    //         userImgSrc: "",
    //         userSkills: [],
    //       };

    //       console.log(allUsersData);
    //       allUsersData.push(newUserData);
    //       console.log(allUsersData);

    //       localStorage.setItem("usersData", JSON.stringify(allUsersData));

    //       refreshUsers(allUsersData);
    //     } else {
    //       alert("email already exists");
    //     }
    //   }

    //   addUserModal.close();
    });
  });
};

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

const addUserBtn = document.querySelector(".add-user-btn button");
const addUserCloseBtn = document.querySelector(".add-user-close-btn");
const updateUserCloseBtn = document.querySelector(".update-user-close-btn");
const addUserModal = document.querySelector("#add-user-modal");
const updateUserModal = document.querySelector("#update-user-modal");
const addUserModalForm = document.querySelector("#add-user-modal form");
const updateUserModalForm = document.querySelector("#update-user-modal form");
const addUserModalFormBtn = document.querySelector(
  "#add-user-modal form button"
);
const updateUserModalFormBtn = document.querySelector(
  "#update-user-modal form button"
);

let allUsersData = JSON.parse(localStorage.getItem("usersData"));
let allUsersProjects = JSON.parse(localStorage.getItem("userProjectsData"));
const allUsersContainer = document.querySelector(".users-container");

refreshUsers(allUsersData);

// ADD USER
addUserBtn.addEventListener("click", (e) => {
  addUserModal.showModal();
});

addUserCloseBtn.addEventListener("click", (e) => {
  addUserModal.close();
});
updateUserCloseBtn.addEventListener("click", (e) => {
  updateUserModal.close();
});

addUserModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const addUserFormFields = new FormData(addUserModalForm, addUserModalFormBtn); // to fetch signup form data
  const addUserName = addUserFormFields.get("signup-fullname");
  const addUserEmail = addUserFormFields.get("signup-email");
  const addUserNumber = addUserFormFields.get("signup-phonenumber");
  const addUserPassword = addUserFormFields.get("signup-password");
  const addUserRole = addUserFormFields.get("signup-role");

  if (
    addUserName === "" ||
    addUserEmail === "" ||
    addUserNumber === "" ||
    addUserPassword === ""
  ) {
    alert("Some input fields are still empty. Fill them and try again.");
  } else {
    if (
      allUsersData &&
      !allUsersData.find((data) => data.userEmail === addUserEmail)
    ) {
      let newUserData = {
        userId: generateId(),
        userRole: addUserRole, // alternatively admin
        userName: addUserName,
        userNumber: addUserNumber,
        userEmail: addUserEmail,
        userPassword: addUserPassword,
        userProfession: "",
        userAbout: "",
        userImgSrc: "",
        userSkills: [],
      };

      console.log(allUsersData);
      allUsersData.push(newUserData);
      console.log(allUsersData);

      localStorage.setItem("usersData", JSON.stringify(allUsersData));

      refreshUsers(allUsersData);
    } else {
      alert("email already exists");
    }
  }

  addUserModal.close();
});

// _____SEARCH USER______

const searchUserInput = document.querySelector(".users-search");
searchUserInput.addEventListener("input", (e) => {
  const searchQuery = searchUserInput.value.toLowerCase();
  filterUsers(searchQuery);
});

const filterUsers = (searchQuery) => {
  let filteredUsers = allUsersData.filter((user) => {
    let userName = user.userName.toLowerCase();
    let userEmail = user.userEmail.toLowerCase();
    let userNumber = user.userNumber.toLowerCase();

    return (
      userName.startsWith(searchQuery) ||
      userEmail.startsWith(searchQuery) ||
      userNumber.startsWith(searchQuery)
    );
  });

  refreshUsers(filteredUsers);
};
