const usersData = [];

const userProjectsData = [
  {
    projectId: 1,
    projectHeading: "Kallyas Project",
    projectDescription:
      "The Kallyas project, crafted with HTML and CSS, has been a valuable learning experience. CSS, particularly flexbox, has been a focus, and though I encountered challenges, I overcame them by diligently seeking solutions on YouTube and Stack Overflow.",
    projectImageLink: "./assets/images/kallyas-project-img.PNG",
    projectTags: ["coding", "programming"],
    projectLanguages: ["C++", "Java"],
    projectFrameworks: ["Express.js", "Bootstrap"],
  },
  {
    projectId: 2,
    projectHeading: "Tic-Tac-Toe Game",
    projectDescription:
      "I've successfully developed a web-based Tic-Tac-Toe game, employing HTML, CSS, and JavaScript for the frontend, and Node.js with Express.js for the backend. This project has been a rich learning experience, particularly in advancing my JavaScript skills. Beyond coding, I've also learned the qualities of a committed and persevering programmer. This project demanded dedication as I delved into complex logic using Javascript, and I remained persistent even when faced with challenges. It's also taught me the importance of adaptability, as I learned to accept different and unique solutions by seeking out ideas that I've gained from various platforms like Youtube and Stack Overflow. Through this project, I've not only created a fun game but also cultivated the essential attributes of a skilled programmer.",
    projectImageLink: "./assets/images/rockpaperscissors-project-img.PNG",
    projectTags: ["coding", "programming"],
    projectLanguages: ["C++", "Java"],
    projectFrameworks: ["Express.js", "Bootstrap"],
  },
  {
    projectId: 3,
    projectHeading: "General Store Software",
    projectDescription:
      "This a desktop application designed specifically for a general store to streamline daily operations. As a shopkeeper, I understand the complexities involved in managing inventory, transactions and other operations, so I embarked on creating a solution. This software is made in Java language, using Java-FX library which is specifically used for creating client-side desktop applications. As for storing data, MySQL database was integrated with this application. This project was made by me and my university friend. And together we learned a key lesson to work as a team. My university friend and I collaborated effectively, addressing challenges, sharing ideas, and establishing a smooth workflow. And for daily report, we used to do daily meetings.",
    projectImageLink: "./assets/images/generalstoresoftware-project-img.jpg",
    projectTags: ["coding", "programming"],
    projectLanguages: ["C++", "Java"],
    projectFrameworks: ["Express.js", "Bootstrap"],
  },
];

// NAVBAR

// __________APPENDING PROJECTS DYNAMICALLY__________

const allProjectsSection = document.querySelector(
  ".projects .projects-inner .all-projects"
);

userProjectsData.forEach((userProject) => {
  allProjectsSection.innerHTML += `<article class="project" id=${userProject.projectId}>
    <div class="project-text">
      <h3>${userProject.projectHeading}</h3>
      <div>
        <p>${userProject.projectDescription}</p>
      </div>
      <div class="project-btns">
        <button class="btn-primary blue-gradient-text">See Live</button>
        <button class="blue-gradient-text">Source Code</button>
      </div>
    </div>
    <picture>
      <img src=${userProject.projectImageLink} alt="">
    </picture>
    </article>`;
});

// __________Project's Modal to display all details of a project__________

const projectArticles = document.querySelectorAll(".project");
const projectDialog = document.getElementById("project-modal-dialog");
const projectDialogCloseBtn = document.querySelector(
  "#project-modal-dialog .project-modal-close-btn"
);

projectArticles.forEach((projectArticle, index) => {
  projectArticle.addEventListener("click", (event) => {
    // Replaced event.target.id to event.currentTarget.id or this.id. The event.target is always the deepest element clicked, while event.currentTarget or this will point to the element to which the handler is bound, or to the element that the delegate selector matched.
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
  });
});

// Closing project model
projectDialogCloseBtn.addEventListener("click", () => {
  console.log("closing modal");
  projectDialog.close();
});

// ________PROJECTS CRUD__________

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
  event.stopPropagation() 
  let addNewProjectTagsInputValue = addNewProjectTagsInput.value;
  userProjectTags.push(addNewProjectTagsInputValue);

  addNewProjectTagsContainer.innerHTML += `<span>${addNewProjectTagsInputValue}</span>`;
  console.log(userProjectTags);

  addNewProjectTagsContainer.addEventListener("click", (e) => {
  event.stopPropagation() 

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
  event.stopPropagation() 
  let addNewProjectlanguagesInputValue = addNewProjectlanguagesInput.value;
  userProjectlanguages.push(addNewProjectlanguagesInputValue);

  addNewProjectlanguagesContainer.innerHTML += `<span>${addNewProjectlanguagesInputValue}</span>`;
  console.log(userProjectlanguages);

  addNewProjectlanguagesContainer.addEventListener("click", (e) => {
  event.stopPropagation() 

    if (e.target.tagName === "SPAN") {
      let spanContent = e.target.textContent;
      userProjectlanguages = userProjectlanguages.filter((tag) => tag !== spanContent);
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
  event.stopPropagation() 
  let addNewProjectframeworksInputValue = addNewProjectframeworksInput.value;
  userProjectframeworks.push(addNewProjectframeworksInputValue);

  addNewProjectframeworksContainer.innerHTML += `<span>${addNewProjectframeworksInputValue}</span>`;
  console.log(userProjectframeworks);

  addNewProjectframeworksContainer.addEventListener("click", (e) => {
  event.stopPropagation() 

    if (e.target.tagName === "SPAN") {
      let spanContent = e.target.textContent;
      userProjectframeworks = userProjectframeworks.filter((tag) => tag !== spanContent);
      console.log(userProjectframeworks);
      addNewProjectframeworksContainer.removeChild(e.target);
    }
  });
});

let addNewProjectSubmitBtn = document.querySelector(".add-new-project-inner button");
let addNewProjectForm = document.querySelector(".add-new-project-inner form");
addNewProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let addNewProjectTitle = document.querySelector("#add-new-project-title");
  let addNewProjectImgSrc = document.querySelector("#add-new-project-img-src");
  let addNewProjectDescription = document.querySelector("#add-new-project-description");

  let data = {
    projectId: generateId(),
  projectHeading: addNewProjectTitle.value,
  projectDescription: addNewProjectDescription.value,
  projectImageLink: addNewProjectImgSrc.value,
  projectTags: userProjectTags,
  projectLanguages: userProjectlanguages,
  projectFrameworks: userProjectframeworks,
  }

  userProjectsData.push(data);

  console.log(data)
})


// {
//   projectId: 1,
//   projectHeading: "Kallyas Project",
//   projectDescription:
//     "The Kallyas project, crafted with HTML and CSS, has been a valuable learning experience. CSS, particularly flexbox, has been a focus, and though I encountered challenges, I overcame them by diligently seeking solutions on YouTube and Stack Overflow.",
//   projectImageLink: "./assets/images/kallyas-project-img.PNG",
//   projectTags: ["coding", "programming"],
//   projectLanguages: ["C++", "Java"],
//   projectFrameworks: ["Express.js", "Bootstrap"],
// }

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
