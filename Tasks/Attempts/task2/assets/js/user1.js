const refreshUserProfile = () => {
  //   const heroUserNameSpan = document.querySelector(".hero-user-name")
  // const heroUserProfessionSpan = document.querySelector(".hero-user-profession")
  // const aboutMeUserImage = document.querySelector(".about-me-user-image")
  // const aboutMeUserAbout = document.querySelector(".about-me-text p")

  document.querySelector(".hero-user-name").innerText = user.userName;
  document.querySelector(".hero-user-profession").innerText =
    user.userProfession;
  document.querySelector(".about-me-text p").innerText = user.userAbout;

  const image = new Image();
  image.src = user.userImgSrc;
  document.querySelector(
    ".about-me-user-image"
  ).innerHTML = ""
  document.querySelector(
    ".about-me-user-image"
  ).appendChild(image)

  // let img = document.createElement("img");
  // img.setAttribute("src", user.userImgSrc);

  // document.querySelector(
  //   ".about-me-user-image"
  // ).innerHTML = "";
  // document.querySelector(
  //   ".about-me-user-image"
  // ).appendChild(img)

  // document.querySelector(
  //   ".about-me-user-image"
  // ).innerHTML = `<img src=${user.userImgSrc} alt="" />`;
};
const generateEducationId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    if (usersEducationData.find((i) => i.userEducationId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

// let usersEducationData = [];
let usersEducationData = JSON.parse(localStorage.getItem("userEducationsData"));

let addEducationModal = document.querySelector("#add-new-education-modal");
let addEducationModalForm = document.querySelector(
  "#add-new-education-modal form"
);
let addEducationForm = document.querySelector(".add-new-education-inner form");
let addEducationBtn = document.querySelector(".add-new-education-btn button");
let addEducationCloseBtn = document.querySelector(
  ".add-new-education-close-btn"
);
let addEducationSubmitBtn = document.querySelector(
  ".add-new-education-submit-btn"
);
let allEducationsContainer = document.querySelector(".all-educations");
// fetching users data from db
let user = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(user);

refreshUserProfile();

addEducationBtn.addEventListener("click", (e) => {
  addEducationModal.showModal();
  // addEducationModalForm.removeEventListener("submit", updateUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", addUserEducationEvent);
});

addEducationCloseBtn.addEventListener("click", (e) => {
  addEducationModal.close();
  // addEducationModalForm.removeEventListener("submit", addUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", updateUserEducationEvent);
});

addEducationModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userEducationData = { userId: user.userId };
  let educationFormData = new FormData(
    addEducationModalForm,
    addEducationSubmitBtn
  );

  userEducationData.userEducationId = generateEducationId();
  userEducationData.userEducationDegree =
    educationFormData.get("education-degree");
  userEducationData.userEducationProgram =
    educationFormData.get("education-program");
  userEducationData.userEducationInstitute = educationFormData.get(
    "education-institute"
  );
  userEducationData.userEducationYears =
    educationFormData.get("education-years");

  usersEducationData.push(userEducationData);
  // localStorage.setItem("userEducationsData", JSON.stringify(usersEducationData));

  console.log("user", usersEducationData);

  // _______refreshing screen______

  refreshEducationContainer();

  addEducationModal.close();
});

// EDUCATION'S FUNCTIONS
const refreshEducationContainer = () => {
  allEducationsContainer.innerHTML = "";
  usersEducationData.forEach((userEduData) => {
    let userEducationContainer = document.createElement("div");
    userEducationContainer.classList.add("education");
    userEducationContainer.id = userEduData.userEducationId;

    // setting data in container
    let userEducationContent = `<h3 class="education-degree-title">${userEduData.userEducationDegree}</h3>
      <div class="education-degree-program"><b>Degree Program -</b> <span>${userEduData.userEducationProgram}</span></div>
      <div class="education-degree-institute"><b>Degree Institute -</b> <span>${userEduData.userEducationInstitute}</span></div>
      <div class="education-degree-years"><b>Degree Duration -</b> <span>${userEduData.userEducationYears}</span></div>
      <div class="education-degree-btns"><button class="education-update-btn">Update</button> <button class="education-delete-btn">Delete</button></div>`;

    userEducationContainer.innerHTML = userEducationContent;

    allEducationsContainer.appendChild(userEducationContainer);

    // updating data in container
    const userEducationUpdate = userEducationContainer.querySelector(
      ".education-update-btn"
    );

    const updateUserEducationForm = userEducationContainer.querySelector(
      "#add-new-education-modal form"
    );
    let educationDegreeInput = document.querySelector(
      "#add-new-education-modal .education-degree"
    );
    let educationProgramInput = document.querySelector(
      "#add-new-education-modal .education-program"
    );
    let educationInstituteInput = document.querySelector(
      "#add-new-education-modal .education-institute"
    );
    let educationYearsInput = document.querySelector(
      "#add-new-education-modal .education-years"
    );
    // adding data in modal's input fields for updation
    userEducationUpdate.addEventListener("click", (e) => {
      e.stopPropagation();
      addEducationModal.showModal();

      educationDegreeInput.value = userEduData.userEducationDegree;
      educationProgramInput.value = userEduData.userEducationProgram;
      educationInstituteInput.value = userEduData.userEducationInstitute;
      educationYearsInput.value = userEduData.userEducationYears;

      refreshEducationContainer();
    });

    // inititalizing updateEducation
    updateUserEducationEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("uef", usersEducationData, userEduData);

      let i = usersEducationData.findIndex(
        (data) => data.userEducationId === Number(userEduData.userEducationId)
      );
      usersEducationData[i].userEducationDegree = educationDegreeInput.value;
      usersEducationData[i].userEducationProgram = educationProgramInput.value;
      usersEducationData[i].userEducationInstitute =
        educationInstituteInput.value;
      usersEducationData[i].userEducationYears = educationYearsInput.value;

      // localStorage.setItem("userEducationsData", JSON.stringify(usersEducationData));


      console.log("uef", usersEducationData, userEduData);

      refreshEducationContainer();
    };

    // deleting data from container
    const userEducationDelete = userEducationContainer.querySelector(
      ".education-delete-btn"
    );
    userEducationDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      let userEducationId = userEducationDelete.parentNode.parentNode.id;
      console.log("chidvochd", usersEducationData);
      usersEducationData = usersEducationData.filter(
        (edu) => edu.userEducationId !== Number(userEducationId)
      );
      // localStorage.setItem("userEducationsData", JSON.stringify(usersEducationData));

      console.log("chidvochd", usersEducationData);

      refreshEducationContainer();
    });
  });
};

// initialized inside forEach loop above to
let updateUserEducationEvent = null;

const addUserEducationEvent = (e) => {
  e.preventDefault();

  let userEducationData = { userId: user.userId };
  let educationFormData = new FormData(
    addEducationModalForm,
    addEducationSubmitBtn
  );

  userEducationData.userEducationId = generateEducationId();
  userEducationData.userEducationDegree =
    educationFormData.get("education-degree");
  userEducationData.userEducationProgram =
    educationFormData.get("education-program");
  userEducationData.userEducationInstitute = educationFormData.get(
    "education-institute"
  );
  userEducationData.userEducationYears =
    educationFormData.get("education-years");

  usersEducationData.push(userEducationData);

  console.log("user", usersEducationData);

  refreshEducationContainer();

  // addEducationModalForm.removeEventListener("submit", addUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", updateUserEducationEvent);
  addEducationModal.close();
};

// ____________EXPERIENCES______________

let usersExperienceData = [];

const addExperienceModal = document.querySelector("#add-new-experience-modal");
const addExperienceModalForm = document.querySelector(
  "#add-new-experience-modal form"
);
const addExperienceModalFormSubmit = document.querySelector(
  "#add-new-experience-modal form button"
);
const addExperienceBtn = document.querySelector(".add-new-experience-btn");
const addExperienceModalCloseBtn = document.querySelector(
  ".add-new-experience-close-btn"
);

addExperienceModalCloseBtn.addEventListener("click", (e) => {
  addExperienceModal.close();
});

addExperienceBtn.addEventListener("click", (e) => {
  addExperienceModal.showModal();
});

addExperienceModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userExperienceData = { userId: user.userId };
  let experienceFormData = new FormData(
    addExperienceModalForm,
    addExperienceModalFormSubmit
  );

  userExperienceData.userExperienceId = generateEducationId();
  userExperienceData.userExperienceTitle =
    experienceFormData.get("experience-title");
  userExperienceData.userExperienceCompany =
    experienceFormData.get("experience-company");
  userExperienceData.userExperienceSkills =
    experienceFormData.get("experience-skills");
  userExperienceData.userExperienceYears =
    experienceFormData.get("experience-years");

  usersExperienceData.push(userExperienceData);

  console.log("user", usersExperienceData);

  // _______refreshing screen______

  refreshExperienceContainer();

  addExperienceModal.close();
});

// EXPERIENCE'S FUNCTIONS

// let addEducationModal = document.querySelector("#add-new-education-modal");
// let addEducationModalForm = document.querySelector(
//   "#add-new-education-modal form"
// );
// let addEducationForm = document.querySelector(".add-new-education-inner form");
// let addEducationBtn = document.querySelector(".add-new-education-btn button");
// let addEducationCloseBtn = document.querySelector(
//   ".add-new-education-close-btn"
// );
// let addEducationSubmitBtn = document.querySelector(
//   ".add-new-education-submit-btn"
// );
// let allEducationsContainer = document.querySelector(".all-educations");

let allExperiencesContainer = document.querySelector(".all-experiences");
const refreshExperienceContainer = () => {
  allExperiencesContainer.innerHTML = "";
  usersExperienceData.forEach((userExpData) => {
    let userExperienceContainer = document.createElement("div");
    userExperienceContainer.classList.add("experience");
    userExperienceContainer.id = userExpData.userExperienceId;

    // setting data in container
    let userExperienceContent = `<h3 class="experience-job-title">${userExpData.userExperienceTitle}</h3>
    <div class="experience-job-company"><b>Company -</b> <span>${userExpData.userExperienceCompany}</span></div>
    <div class="experience-job-skills"><b>Skills required -</b> <span>${userExpData.userExperienceSkills}</span></div>
    <div class="experience-job-years"><b>Years -</b> <span>${userExpData.userExperienceYears}</span></div>
    <div class="experience-job-btns">
      <button class="experience-delete-btn">Delete</button>
      <button class="experience-update-btn">Update</button>
    </div>`;

    userExperienceContainer.innerHTML = userExperienceContent;

    allExperiencesContainer.appendChild(userExperienceContainer);

    // updating data in container
    const userExperienceUpdate = userExperienceContainer.querySelector(
      ".experience-update-btn"
    );

    const updateUserExperienceForm = userExperienceContainer.querySelector(
      "#add-new-experience-modal form"
    );
    let experienceTitleInput = document.querySelector(
      "#add-new-experience-modal .experience-Title"
    );
    let experienceCompanyInput = document.querySelector(
      "#add-new-experience-modal .experience-company"
    );
    let experienceSkillsInput = document.querySelector(
      "#add-new-experience-modal .experience-skills"
    );
    let experienceYearsInput = document.querySelector(
      "#add-new-experience-modal .experience-years"
    );
    // adding data in modal's input fields for updation
    userExperienceUpdate.addEventListener("click", (e) => {
      e.stopPropagation();
      addExperienceModal.showModal();

      experienceTitleInput.value = userExpData.userExperienceTitle;
      experienceCompanyInput.value = userExpData.userExperienceCompany;
      experienceSkillsInput.value = userExpData.userExperienceSkills;
      experienceYearsInput.value = userExpData.userExperienceYears;

      refreshExperienceContainer();
    });

    // inititalizing updateExperience
    // updateUserExperienceEvent = (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();

    //   console.log("uef", usersExperienceData, userExpData);

    //   let i = usersExperienceData.findIndex(
    //     (data) => data.userExperienceId === Number(userExpData.userExperienceId)
    //   );
    //   usersExperienceData[i].userExperienceDegree = experienceDegreeInput.value;
    //   usersExperienceData[i].userExperienceProgram =
    //     experienceProgramInput.value;
    //   usersExperienceData[i].userExperienceInstitute =
    //     experienceInstituteInput.value;
    //   usersExperienceData[i].userExperienceYears = experienceYearsInput.value;

    //   console.log("uef", usersExperienceData, userExpData);

    //   refreshExperienceContainer();
    // };

    // deleting data from container
    const userExperienceDelete = userExperienceContainer.querySelector(
      ".experience-delete-btn"
    );
    userExperienceDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      let userExperienceId = userExperienceDelete.parentNode.parentNode.id;
      console.log("chidvochd", usersExperienceData);
      usersExperienceData = usersExperienceData.filter(
        (exp) => exp.userExperienceId !== Number(userExperienceId)
      );
      console.log("chidvochd", usersExperienceData);

      refreshExperienceContainer();
    });
  });
};

// ____________EXPERIENCES______________

let userSkillsData = [];
let allUsersData = JSON.parse(localStorage.getItem("usersData"));
let userIndex = allUsersData.findIndex(
  (userData) => userData.userId === user.userId
);

const addSkillForm = document.querySelector(".add-new-skill-btn form");
const addSkillFormInput = document.querySelector(
  ".add-new-skill-btn form input"
);
const allSkillsContainer = document.querySelector(".all-skills");

addSkillForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userSkillsData.push(addSkillFormInput.value);
  user.userSkills = userSkillsData;
  allUsersData[userIndex] = user;
  localStorage.setItem("usersData", JSON.stringify(allUsersData));
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  console.log(userSkillsData);

  // refresh

  refreshSkillsContainer();
});

const refreshSkillsContainer = () => {
  allSkillsContainer.innerHTML = "";
  userSkillsData.forEach((userSkill) => {
    let userSkillContainer = document.createElement("div");
    userSkillContainer.classList.add("skill");
    userSkillContainer.id = userSkill;

    const userSkillContent = `<span>${userSkill}</span><button class="skill-delete-btn">Delete</button>`;

    userSkillContainer.innerHTML = userSkillContent;

    allSkillsContainer.appendChild(userSkillContainer);

    // deleting data from container
    const userSkillDelete =
      userSkillContainer.querySelector(".skill-delete-btn");
    userSkillDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      let userSkillId = userSkillDelete.parentNode.id;
      console.log("chidvochd", userSkillsData);
      userSkillsData = userSkillsData.filter((skill) => skill !== userSkillId);
      user.userSkills = userSkillsData;
      allUsersData[userIndex] = user;
      localStorage.setItem("usersData", JSON.stringify(allUsersData));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      console.log("chidvochd", userSkillsData);

      refreshSkillsContainer();
    });
  });
};

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

  // let userPortfolioImg = updateUserImgSrcInput.files[0]
  // if(userPortfolioImg) {
  //   updateUserImgSrcInput.value = URL.createObjectURL(userPortfolioImg);
  // }

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

// const heroUserNameSpan = document.querySelector(".hero-user-name")
// const heroUserProfessionSpan = document.querySelector(".hero-user-profession")
// const aboutMeUserImage = document.querySelector(".about-me-user-image")
// const aboutMeUserAbout = document.querySelector(".about-me-text p")
