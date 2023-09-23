const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let userProjectsData = JSON.parse(localStorage.getItem("userProjectsData"));
// userProjectData
// if(userProjectsData.length > 0) {
//   userProjectsData = userProjectsData.filter((project) => project.userId === loggedInUser.userId);
// }

// let userProjectsData = [
// {
//   userId: loggedInUser.userId,
//   projectId: 1,
//   projectHeading: "Kallyas Project",
//   projectDescription:
//     "The Kallyas project, crafted with HTML and CSS, has been a valuable learning experience. CSS, particularly flexbox, has been a focus, and though I encountered challenges, I overcame them by diligently seeking solutions on YouTube and Stack Overflow.",
//   projectImageLink: "./assets/images/kallyas-project-img.PNG",
//   projectTags: ["coding", "programming"],
//   projectLanguages: ["C++", "Java"],
//   projectFrameworks: ["Express.js", "Bootstrap"],
// },
// {
//   userId: loggedInUser.userId,
//   projectId: 2,
//   projectHeading: "Tic-Tac-Toe Game",
//   projectDescription:
//     "I've successfully developed a web-based Tic-Tac-Toe game, employing HTML, CSS, and JavaScript for the frontend, and Node.js with Express.js for the backend. This project has been a rich learning experience, particularly in advancing my JavaScript skills. Beyond coding, I've also learned the qualities of a committed and persevering programmer. This project demanded dedication as I delved into complex logic using Javascript, and I remained persistent even when faced with challenges. It's also taught me the importance of adaptability, as I learned to accept different and unique solutions by seeking out ideas that I've gained from various platforms like Youtube and Stack Overflow. Through this project, I've not only created a fun game but also cultivated the essential attributes of a skilled programmer.",
//   projectImageLink: "./assets/images/rockpaperscissors-project-img.PNG",
//   projectTags: ["coding", "programming"],
//   projectLanguages: ["C++", "Java"],
//   projectFrameworks: ["Express.js", "Bootstrap"],
// },
// {
//   userId: loggedInUser.userId,
//   projectId: 3,
//   projectHeading: "General Store Software",
//   projectDescription:
//     "This a desktop application designed specifically for a general store to streamline daily operations. As a shopkeeper, I understand the complexities involved in managing inventory, transactions and other operations, so I embarked on creating a solution. This software is made in Java language, using Java-FX library which is specifically used for creating client-side desktop applications. As for storing data, MySQL database was integrated with this application. This project was made by me and my university friend. And together we learned a key lesson to work as a team. My university friend and I collaborated effectively, addressing challenges, sharing ideas, and establishing a smooth workflow. And for daily report, we used to do daily meetings.",
//   projectImageLink: "./assets/images/generalstoresoftware-project-img.jpg",
//   projectTags: ["coding", "programming"],
//   projectLanguages: ["C++", "Java"],
//   projectFrameworks: ["Express.js", "Bootstrap"],
// },
// ];

// __________CHECKING LOGIN & LOGOUT__________

// const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const navbarLogoutBtn = document.querySelector(".navbar-logout-btn");

if (loggedInUser) {
  console.log("userLoggedIn", loggedInUser);
} else {
  window.location.href = "./authentication.html";
}

navbarLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "./authentication.html";
});

// __________APPENDING PROJECTS DYNAMICALLY__________

const allProjectsSection = document.querySelector(
  ".projects .projects-inner .all-projects"
);
let updateProjectDataForm = document.querySelector(
  ".update-project-inner form"
);
let updateProjectDataFormBtn = document.querySelector(
  ".update-project-inner form button"
);
let updateProjectFrameworksContainer = document.querySelector(
  ".update-project-frameworks-container"
);
let updateProjectFrameworksInput = document.querySelector(
  ".update-project-frameworks-input input"
);
let updateProjectFrameworksAdd = document.querySelector(
  ".update-project-frameworks-input a"
);

let updateProjectLanguagesContainer = document.querySelector(
  ".update-project-languages-container"
);
let updateProjectLanguagesInput = document.querySelector(
  ".update-project-languages-input input"
);
let updateProjectLanguagesAdd = document.querySelector(
  ".update-project-languages-input a"
);

let updateProjectTagsContainer = document.querySelector(
  ".update-project-tags-container"
);
let updateProjectTagsInput = document.querySelector(
  ".update-project-tags-input input"
);
let updateProjectTagsAdd = document.querySelector(
  ".update-project-tags-input a"
);
// project's input field
let updateProjectFormTitleInput = document.querySelector(
  ".update-project-inner form #update-project-title"
);

let updateProjectFormDescriptionInput = document.querySelector(
  ".update-project-inner form #update-project-description"
);
let updateProjectFormImgSrcInput = document.querySelector(
  ".update-project-inner form #update-project-img-src"
);

let userProjectDataForUpdate;

updateProjectFrameworksAdd.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("FW ADDEVENTLISTENER");
  userProjectDataForUpdate.value.projectFrameworks.push(
    updateProjectFrameworksInput.value
  );
  updateDialogRefreshExtrasList(
    updateProjectFrameworksContainer,
    userProjectDataForUpdate.value.projectFrameworks
  );
});

updateProjectLanguagesAdd.addEventListener("click", (e) => {
  e.stopPropagation();
  userProjectDataForUpdate.value.projectLanguages.push(
    updateProjectLanguagesInput.value
  );
  updateDialogRefreshExtrasList(
    updateProjectLanguagesContainer,
    userProjectDataForUpdate.value.projectLanguages
  );
});
updateProjectTagsAdd.addEventListener("click", (e) => {
  e.stopPropagation();
  userProjectDataForUpdate.value.projectTags.push(updateProjectTagsInput.value);
  updateDialogRefreshExtrasList(
    updateProjectTagsContainer,
    userProjectDataForUpdate.value.projectTags
  );
});

const refreshProjects = (itemsContainer, items) => {
  if (items.length > 0)
    items = items.filter((item) => item.userId === loggedInUser.userId);
  items.forEach((item) => {
    let newProject = document.createElement("article");
    newProject.classList.add("project");
    newProject.id = item.projectId;

    newProject.innerHTML = `<div class="project-text">
    <h3>${item.projectHeading}</h3>
    <div>
      <p>${item.projectDescription}</p>
    </div>
    <div class="project-btns">
      <button class="btn-primary blue-gradient-text">See Live</button>
      <button class="blue-gradient-text">Source Code</button>
    </div>
    <div class="project-update-delete-btns">
      <button id=${item.projectId} class="project-delete-btn">Delete</button>
      <button class="project-update-btn">Update</button>
    </div>
  </div>
  <picture id=${item.projectId}>
    <img src=${item.projectImageLink} alt="">
  </picture>`;
    itemsContainer.appendChild(newProject);

    // UPDATING PROJECT

    let updateProjectModal = document.querySelector("#update-project-modal");
    let updateProjectBtn = newProject.querySelector(".project-update-btn");
    let updateProjectCloseBtn = document.querySelector(
      "#update-project-modal .update-project-close-btn"
    );

    updateProjectBtn.addEventListener("click", () => {
      let projectId = updateProjectBtn.parentNode.parentNode.parentNode.id;
      // let userProjectData = userProjectsData.find(
      //   (project) => project.projectId === Number(projectId)
      // );

      // storing project's data in an object rather than simply assigning it to a variable. as objects are passed (as a func arg or var) as reference which means when i change that func's or var's value the original object also changes and we needed it bcz we're implementing update frameworks, tags, etc outside of loop
      let userProjectData = {
        value: userProjectsData.find(
          (project) => project.projectId === Number(projectId)
        ),
      };

      userProjectDataForUpdate = userProjectData;

      updateProjectFormTitleInput.value = userProjectData.value.projectHeading;
      updateProjectFormDescriptionInput.value =
        userProjectData.value.projectDescription;
      // updateProjectFormImgSrcInput.value =
      //   userProjectData.value.projectImageLink;

      updateProjectFrameworksContainer.innerHTML = "";
      updateProjectLanguagesContainer.innerHTML = "";
      updateProjectTagsContainer.innerHTML = "";

      userProjectData.value.projectFrameworks.forEach((framework) => {
        console.log("FW FOREACH");
        updateProjectFrameworksContainer.innerHTML += `<span>${framework}</span>`;
        updateProjectFrameworksContainer.addEventListener("click", (e) => {
          if (e.target.tagName === "SPAN") {
            let spanContent = e.target.textContent;
            console.log(userProjectData.value.projectFrameworks);
            userProjectData.value.projectFrameworks =
              userProjectData.value.projectFrameworks.filter(
                (framework) => framework !== spanContent
              );
            console.log(userProjectData.value.projectFrameworks);

            updateDialogRefreshExtrasList(
              updateProjectFrameworksContainer,
              userProjectData.value.projectFrameworks
            );
          }
          e.stopPropagation();
        });
      });

      userProjectData.value.projectLanguages.forEach((framework) => {
        updateProjectLanguagesContainer.innerHTML += `<span>${framework}</span>`;
        updateProjectLanguagesContainer.addEventListener("click", (e) => {
          if (e.target.tagName === "SPAN") {
            let spanContent = e.target.textContent;
            console.log(userProjectData.value.projectLanguages);
            userProjectData.value.projectLanguages =
              userProjectData.value.projectLanguages.filter(
                (framework) => framework !== spanContent
              );
            console.log(userProjectData.value.projectLanguages);

            updateDialogRefreshExtrasList(
              updateProjectLanguagesContainer,
              userProjectData.value.projectLanguages
            );
          }
          e.stopPropagation();
        });
      });

      userProjectData.value.projectTags.forEach((framework) => {
        updateProjectTagsContainer.innerHTML += `<span>${framework}</span>`;
        updateProjectTagsContainer.addEventListener("click", (e) => {
          if (e.target.tagName === "SPAN") {
            let spanContent = e.target.textContent;
            console.log(userProjectData.value.projectTags);
            userProjectData.value.projectTags =
              userProjectData.value.projectTags.filter(
                (framework) => framework !== spanContent
              );
            console.log(userProjectData.value.projectTags);

            updateDialogRefreshExtrasList(
              updateProjectTagsContainer,
              userProjectData.value.projectTags
            );
          }
          e.stopPropagation();
        });
      });

      let updateProjectForm = document.querySelector(
        ".update-project-inner form"
      );
      updateProjectForm.addEventListener("submit", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (
          updateProjectFormTitleInput.value === "" ||
          updateProjectFormDescriptionInput.value === "" ||
          updateProjectFormImgSrcInput.value === "" ||
          userProjectData.value.projectTags.length === 0 ||
          userProjectData.value.projectLanguages.length === 0 ||
          userProjectData.value.projectFrameworks.length === 0
        ) {
          alert("Fill in the empty fields.");
        } else {
          userProjectData.value.projectHeading =
            updateProjectFormTitleInput.value;
          userProjectData.value.projectDescription =
            updateProjectFormDescriptionInput.value;
          // userProjectData.value.projectImageLink =
          //   updateProjectFormImgSrcInput.value;
          let imgFile = updateProjectFormImgSrcInput.files[0];
          let reader = new FileReader();
          reader.onload = function (e) {
            userProjectData.value.projectImageLink = e.target.result;

            let i = userProjectsData.findIndex(
              (p) => p.projectId === userProjectData.value.projectId
            );
            userProjectsData[i] = userProjectData.value;
            localStorage.setItem(
              "userProjectsData",
              JSON.stringify(userProjectsData)
            );

            addNewDataAndRefresh(userProjectData.value, allProjectsContainer);

            updateProjectModal.close();
          };
          reader.readAsDataURL(imgFile);

          // let i = userProjectsData.findIndex(
          //   (p) => p.projectId === userProjectData.value.projectId
          // );
          // userProjectsData[i] = userProjectData.value;
          // localStorage.setItem(
          //   "userProjectsData",
          //   JSON.stringify(userProjectsData)
          // );

          // addNewDataAndRefresh(userProjectData.value, allProjectsContainer);

          // updateProjectModal.close();

          // updateProjectFormTitleInput.value = ""
          //     updateProjectFormDescriptionInput.value = ""
          //     updateProjectFormImgSrcInput.value = ""
          updateProjectLanguagesContainer.innerHTML = "";
          updateProjectFrameworksContainer.innerHTML = "";
          updateProjectTagsContainer.innerHTML = "";
        }
      });

      updateProjectModal.showModal();
    });

    updateProjectCloseBtn.addEventListener("click", () => {
      updateProjectModal.close();
    });

    // DELETING PROJECT
    let projectDelBtn = newProject.querySelector(".project-delete-btn");
    projectDelBtn.addEventListener("click", (e) => {
      // console.log(projectId);
      console.log(userProjectsData);

      userProjectsData = userProjectsData.filter(
        (project) => project.projectId !== Number(projectDelBtn.id)
      );
      localStorage.setItem(
        "userProjectsData",
        JSON.stringify(userProjectsData)
      );

      allProjectsContainer.innerHTML = "";
      allProjectsDeleteBtns = document.querySelectorAll(".project-delete-btn");
      refreshProjects(allProjectsContainer, userProjectsData);

      console.log(userProjectsData);
    });

    // PROJECT MODAL DISPLAY

    let projectPicture = newProject.querySelector(".project picture");
    projectPicture.addEventListener("click", (event) => {
      console.log(event.currentTarget.id);
      const currentTargetId = event.currentTarget.id;
      const project = userProjectsData.find(
        (project) => project.projectId === Number(currentTargetId)
      );

      // Adding data in modal
      const projectModalH3 = document.querySelector(".project-modal h3");
      projectModalH3.innerText = project.projectHeading;

      const projectModalImg = document.querySelector(
        ".project-modal picture img"
      );
      projectModalImg.setAttribute("src", project.projectImageLink);

      const projectModalP = document.querySelector(".project-modal p");
      projectModalP.innerText = project.projectDescription;

      const projectModalLanguagesContainer = document.querySelector(
        ".project-languages .languages-container"
      );
      const projectModalFrameworksContainer = document.querySelector(
        ".project-frameworks .frameworks-container"
      );
      const projectModalTagsContainer = document.querySelector(
        ".project-tags .tags-container"
      );
      // resetting previous project's data from containers
      projectModalLanguagesContainer.innerHTML = "";
      projectModalFrameworksContainer.innerHTML = "";
      projectModalTagsContainer.innerHTML = "";
      project.projectLanguages.forEach(
        (i) => (projectModalLanguagesContainer.innerHTML += `<li>${i}</li>`)
      );
      project.projectFrameworks.forEach(
        (i) => (projectModalFrameworksContainer.innerHTML += `<li>${i}</li>`)
      );
      project.projectTags.forEach(
        (i) => (projectModalTagsContainer.innerHTML += `<li>${i}</li>`)
      );

      // Display modal to show all project's details
      projectDialog.showModal();
      event.stopPropagation();
    });
  });
};
refreshProjects(allProjectsSection, userProjectsData);

// __________Project's Modal to display all details of a project__________

const projectArticles = document.querySelectorAll(".project");
const projectArticlesPictures = document.querySelectorAll(".project picture");
const projectDialog = document.getElementById("project-modal-dialog");
const projectDialogCloseBtn = document.querySelector(
  "#project-modal-dialog .project-modal-close-btn"
);

// // projectArticles.forEach((projectArticle, index) => {
// projectArticlesPictures.forEach((projectArticlePicture, index) => {
//   // projectArticle.addEventListener("click", (event) => {
//   projectArticlePicture.addEventListener("click", (event) => {
//     // Replaced event.target.id to event.currentTarget.id or this.id. The event.target is always the deepest element clicked, while event.currentTarget or this will point to the element to which the handler is bound, or to the element that the delegate selector matched.
//     console.log(event.currentTarget.id);
//     const currentTargetId = event.currentTarget.id;
//     const project = userProjectsData.find(
//       (project) => project.projectId === Number(currentTargetId)
//     );

//     // Adding data in modal
//     const projectModalH3 = document.querySelector(".project-modal h3");
//     projectModalH3.innerText = project.projectHeading;

//     const projectModalImg = document.querySelector(
//       ".project-modal picture img"
//     );
//     projectModalImg.setAttribute("src", project.projectImageLink);

//     const projectModalP = document.querySelector(".project-modal p");
//     projectModalP.innerText = project.projectDescription;

//     const projectModalLanguagesContainer = document.querySelector(
//       ".project-languages .languages-container"
//     );
//     const projectModalFrameworksContainer = document.querySelector(
//       ".project-frameworks .frameworks-container"
//     );
//     const projectModalTagsContainer = document.querySelector(
//       ".project-tags .tags-container"
//     );
//     // resetting previous project's data from containers
//     projectModalLanguagesContainer.innerHTML = "";
//     projectModalFrameworksContainer.innerHTML = "";
//     projectModalTagsContainer.innerHTML = "";
//     project.projectLanguages.forEach(
//       (i) => (projectModalLanguagesContainer.innerHTML += `<li>${i}</li>`)
//     );
//     project.projectFrameworks.forEach(
//       (i) => (projectModalFrameworksContainer.innerHTML += `<li>${i}</li>`)
//     );
//     project.projectTags.forEach(
//       (i) => (projectModalTagsContainer.innerHTML += `<li>${i}</li>`)
//     );

//     // Display modal to show all project's details
//     projectDialog.showModal();
//     event.stopPropagation();
//   });
// });

// Closing project model
projectDialogCloseBtn.addEventListener("click", () => {
  console.log("closing modal");
  projectDialog.close();
});

// ________PROJECTS CRUD__________

// Update project

let allProjectsContainer = document.querySelector(".all-projects");
let allProjects = document.querySelectorAll(".project");
let allProjectsDeleteBtns = document.querySelectorAll(".project-delete-btn");

// allProjectsDeleteBtns.forEach((projectDeleteBtn) => {
//   projectDeleteBtn.addEventListener("click", (e) => {
//     const projectId = e.target.id;
//     console.log(projectId);
//     console.log(userProjectsData);

//     userProjectsData = userProjectsData.filter(
//       (project) => project.projectId !== Number(projectId)
//     );

//     allProjectsContainer.innerHTML = "";
//     allProjectsDeleteBtns = document.querySelectorAll(".project-delete-btn")
//     refreshProjects(allProjectsContainer, userProjectsData);

//     console.log(userProjectsData);
//   });
// });

// allProjectsContainer.addEventListener("click", (e) => {
//   const projectId = e.target.id;
//   if (e.target.classList.contains("project-delete-btn")) {
//     console.log(projectId);
//     console.log(userProjectsData);

//     userProjectsData = userProjectsData.filter(
//       (project) => project.projectId !== Number(projectId)
//     );

//     allProjectsContainer.innerHTML = "";
//     allProjectsDeleteBtns = document.querySelectorAll(".project-delete-btn");
//     refreshProjects(allProjectsContainer, userProjectsData);

//     console.log(userProjectsData);
//   }
// });

// Updating project

// Creating new project

const addNewProjectModal = document.querySelector("#add-new-project-modal");
const addNewProjectBtn = document.querySelector(".add-new-project-btn");
const addNewProjectCloseBtn = document.querySelector(
  "#add-new-project-modal .add-new-project-close-btn"
);

addNewProjectBtn.addEventListener("click", () => {
  addNewProjectModal.showModal();
});

addNewProjectCloseBtn.addEventListener("click", () => {
  addNewProjectModal.close();
});

// SETUP OF ADDING, TAGS, LANGS:
const addNewProjectTagsInput = document.querySelector(
  ".add-new-project-tags-input input"
);
const addNewProjectTagsContainer = document.querySelector(
  ".add-new-project-tags-container"
);
const addNewProjectTags = document.querySelectorAll(
  ".add-new-project-tags-container span"
);
const addNewProjectTagsBtn = document.querySelector(
  ".add-new-project-tags-input a"
);
let userProjectTags = [];

addNewProjectTagsBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  let addNewProjectTagsInputValue = addNewProjectTagsInput.value;
  userProjectTags.push(addNewProjectTagsInputValue);

  addNewProjectTagsContainer.innerHTML += `<span>${addNewProjectTagsInputValue}</span>`;
  console.log(userProjectTags);

  addNewProjectTagsContainer.addEventListener("click", (e) => {
    event.stopPropagation();

    if (e.target.tagName === "SPAN") {
      let spanContent = e.target.textContent;
      userProjectTags = userProjectTags.filter((tag) => tag !== spanContent);
      console.log(userProjectTags);
      addNewProjectTagsContainer.removeChild(e.target);
    }
  });
});

const addNewProjectlanguagesInput = document.querySelector(
  ".add-new-project-languages-input input"
);
const addNewProjectlanguagesContainer = document.querySelector(
  ".add-new-project-languages-container"
);
const addNewProjectlanguages = document.querySelectorAll(
  ".add-new-project-languages-container span"
);
const addNewProjectlanguagesBtn = document.querySelector(
  ".add-new-project-languages-input a"
);
let userProjectlanguages = [];

addNewProjectlanguagesBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  let addNewProjectlanguagesInputValue = addNewProjectlanguagesInput.value;
  userProjectlanguages.push(addNewProjectlanguagesInputValue);

  addNewProjectlanguagesContainer.innerHTML += `<span>${addNewProjectlanguagesInputValue}</span>`;
  console.log(userProjectlanguages);

  addNewProjectlanguagesContainer.addEventListener("click", (e) => {
    event.stopPropagation();

    if (e.target.tagName === "SPAN") {
      let spanContent = e.target.textContent;
      userProjectlanguages = userProjectlanguages.filter(
        (tag) => tag !== spanContent
      );
      console.log(userProjectlanguages);
      addNewProjectlanguagesContainer.removeChild(e.target);
    }
  });
});

// add languages
const addNewProjectframeworksInput = document.querySelector(
  ".add-new-project-frameworks-input input"
);
const addNewProjectframeworksContainer = document.querySelector(
  ".add-new-project-frameworks-container"
);
const addNewProjectframeworks = document.querySelectorAll(
  ".add-new-project-frameworks-container span"
);
const addNewProjectframeworksBtn = document.querySelector(
  ".add-new-project-frameworks-input a"
);
let userProjectframeworks = [];

addNewProjectframeworksBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  let addNewProjectframeworksInputValue = addNewProjectframeworksInput.value;
  userProjectframeworks.push(addNewProjectframeworksInputValue);

  addNewProjectframeworksContainer.innerHTML += `<span>${addNewProjectframeworksInputValue}</span>`;
  console.log(userProjectframeworks);

  addNewProjectframeworksContainer.addEventListener("click", (e) => {
    event.stopPropagation();

    if (e.target.tagName === "SPAN") {
      let spanContent = e.target.textContent;
      userProjectframeworks = userProjectframeworks.filter(
        (tag) => tag !== spanContent
      );
      console.log(userProjectframeworks);
      addNewProjectframeworksContainer.removeChild(e.target);
    }
  });
});

let addNewProjectSubmitBtn = document.querySelector(
  ".add-new-project-inner button"
);
let addNewProjectForm = document.querySelector(".add-new-project-inner form");
addNewProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let addNewProjectTitle = document.querySelector("#add-new-project-title");
  let addNewProjectImgSrc = document.querySelector("#add-new-project-img-src");
  let addNewProjectDescription = document.querySelector(
    "#add-new-project-description"
  );

  if (
    addNewProjectTitle.value === "" ||
    addNewProjectDescription.value === "" ||
    addNewProjectTitle.value === "" ||
    userProjectTags.length === 0 ||
    userProjectlanguages.length === 0 ||
    userProjectframeworks.length === 0
  ) {
    alert("Fill in the empty fields.");
  } else {
    let imgFile = addNewProjectImgSrc.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = {
        userId: loggedInUser.userId,
        projectId: generateId(),
        projectHeading: addNewProjectTitle.value,
        projectDescription: addNewProjectDescription.value,
        projectImageLink: e.target.result,
        projectTags: userProjectTags,
        projectLanguages: userProjectlanguages,
        projectFrameworks: userProjectframeworks,
      };

      userProjectsData.push(data);
      localStorage.setItem(
        "userProjectsData",
        JSON.stringify(userProjectsData)
      );

      addNewDataAndRefresh(data, allProjectsContainer);
      addNewProjectModal.close();
    };
    reader.readAsDataURL(imgFile);

    // let data = {
    //   userId: loggedInUser.userId,
    //   projectId: generateId(),
    //   projectHeading: addNewProjectTitle.value,
    //   projectDescription: addNewProjectDescription.value,
    //   projectImageLink: addNewProjectImgSrc.value,
    //   projectTags: userProjectTags,
    //   projectLanguages: userProjectlanguages,
    //   projectFrameworks: userProjectframeworks,
    // };

    // // userProjectsData.push(data);
    // // allProjectsContainer.innerHTML = "";
    // // refreshProjects(allProjectsContainer, userProjectsData);
    // // addNewProjectModal.close();
    // userProjectsData.push(data);
    // localStorage.setItem("userProjectsData", JSON.stringify(userProjectsData));

    // addNewDataAndRefresh(data, allProjectsContainer);
  }
});

// __________FUNCTIONS_________

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

const updateDialogRefreshExtrasList = (extrasContainer, extrasData) => {
  extrasContainer.innerHTML = "";
  extrasData.forEach(
    (projectExtra) =>
      (extrasContainer.innerHTML += `<span>${projectExtra}</span>`)
  );
};

const addNewDataAndRefresh = (data, container) => {
  container.innerHTML = "";
  refreshProjects(container, userProjectsData);
  addNewProjectModal.close();
};
