// __________CHECKING LOGIN & LOGOUT__________

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const navbarLogoutBtn = document.querySelector(".navbar-logout-btn");

if (loggedInUser && loggedInUser.userRole === "admin") {
  console.log("userLoggedIn", loggedInUser);
} else {
  window.location.href = "./authentication.html";
}

// ____________REFRESH PROJECTS____________

let allProjectsContainer = document.querySelector(".projects-container");
let userProjects = JSON.parse(localStorage.getItem("userProjectsData"));

const refreshProjects = (filteredProjects) => {
    allProjectsContainer.innerHTML = "";
    filteredProjects.forEach((project) => {
        let newProject = `<div class="project">
        <picture class="project-img">
          <img
            src=${project.projectImageLink}
            alt=""
          />
        </picture>
        <div class="project-text">
          <h2>${project.projectHeading}</h2>
          <div class="project-description">${project.projectDescription}</div>
        </div>
      </div>`

      allProjectsContainer.innerHTML += newProject;
    });
}

refreshProjects(userProjects);

// __________SEARCH PROJECTS FUNCTIONALITY____________

const searchProjectsInput = document.querySelector(".search-projects input");
searchProjectsInput.addEventListener("input", (e) => {
  const searchQuery = searchProjectsInput.value.toLowerCase();
  filterProjects(searchQuery);
});

const filterProjects = (searchQuery) => {
  let filteredProjects = userProjects.filter((project) => {
    // const projectName = project.projectHeading.toLowerCase();
    const projectTags = project.projectTags.map(tag => tag.toLowerCase());
    const projectLanguages = project.projectLanguages.map(tag => tag.toLowerCase());
    const projectFrameworks = project.projectFrameworks.map(tag => tag.toLowerCase());

    return (
    //   projectName.startsWith(searchQuery) ||
      projectTags.some((tag) => tag.startsWith(searchQuery)) ||
      projectLanguages.some((language) => language.startsWith(searchQuery)) ||
      projectFrameworks.some((framework) => framework.startsWith(searchQuery)) 
    );
  });

  refreshProjects(filteredProjects);
};

