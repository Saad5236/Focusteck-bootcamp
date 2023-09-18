const generateExperienceId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    if (usersExperienceData.find((i) => i.userExperienceId === id)) {
      // if (usersData.find((i) => i.userEducationId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};
const generateEducationId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    if (usersEducationData.find((i) => i.userEducationId === id)) {
      // if (usersData.find((i) => i.userEducationId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

// ______________EDUCATIONS______________

// let usersEducationData = [];
let usersEducationData = JSON.parse(localStorage.getItem("userEducationsData"));

let addEducationModal = document.querySelector("#add-new-education-modal");
let updateEducationModal = document.querySelector("#update-education-modal");
let addEducationModalForm = document.querySelector(
  "#add-new-education-modal form"
);
let updateEducationModalForm = document.querySelector(
  "#update-education-modal form"
);
// let addEducationForm = document.querySelector(".add-new-education-inner form");
let addEducationBtn = document.querySelector(".add-new-education-btn button");
let addEducationSubmitBtn = document.querySelector(
  ".add-new-education-submit-btn"
);
let updateEducationSubmitBtn = document.querySelector(
  ".update-education-submit-btn"
);
let addEducationCloseBtn = document.querySelector(
  ".add-new-education-close-btn"
);
let updateEducationCloseBtn = document.querySelector(
  ".update-education-close-btn"
);

let allEducationsContainer = document.querySelector(".all-educations");
// fetching users data from db
let user = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(user);

let educationIdForUpdate;

// refreshUserProfile();

addEducationBtn.addEventListener("click", (e) => {
  addEducationModal.showModal();
});
addEducationCloseBtn.addEventListener("click", (e) => {
  addEducationModal.close();
});
updateEducationCloseBtn.addEventListener("click", (e) => {
  updateEducationModal.close();
});

addEducationModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userEducationData = { userId: user.userId };
  let educationFormData = new FormData(
    addEducationModalForm,
    addEducationSubmitBtn
  );

  if (
    !educationFormData.get("education-degree") ||
    !educationFormData.get("education-program") ||
    !educationFormData.get("education-institute") ||
    !educationFormData.get("education-years")
  ) {
    alert("Some fields are empty");
  } else {
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
    localStorage.setItem(
      "userEducationsData",
      JSON.stringify(usersEducationData)
    );

    console.log("user", usersEducationData);

    // _______refreshing screen______

    refreshEducationContainer();

    addEducationModal.close();
  }
});
updateEducationModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const updateEducationFields = new FormData(
    updateEducationModalForm,
    updateEducationSubmitBtn
  );

  const updateEducationDegree = updateEducationFields.get(
    "update-education-degree"
  );
  const updateEducationProgram = updateEducationFields.get(
    "update-education-program"
  );
  const updateEducationYears = updateEducationFields.get(
    "update-education-years"
  );
  const updateEducationInstitute = updateEducationFields.get(
    "update-education-institute"
  );

  if (
    !updateEducationDegree ||
    !updateEducationProgram ||
    !updateEducationYears ||
    !updateEducationInstitute
  ) {
    alert("SOME FIELDS ARE EMPTY");
  } else {
    let index = usersEducationData.findIndex((u) => {
      return u.userEducationId === educationIdForUpdate;
    });

    console.log("old", usersEducationData, index);

    usersEducationData[index].userEducationDegree = updateEducationDegree;
    usersEducationData[index].userEducationProgram = updateEducationProgram;
    usersEducationData[index].userEducationInstitute = updateEducationInstitute;
    usersEducationData[index].userEducationYears = updateEducationYears;

    console.log("new", usersEducationData, index);

    localStorage.setItem(
      "userEducationsData",
      JSON.stringify(usersEducationData)
    );

    refreshEducationContainer();
  }

  updateEducationModal.close();
});

// EDUCATION'S FUNCTIONS

const refreshEducationContainer = () => {
  let filteredUserEducationsData = usersEducationData.filter(
    (userEd) => userEd.userId === user.userId
  );

  allEducationsContainer.innerHTML = "";
  // usersEducationData.forEach((userEduData) => {
  filteredUserEducationsData.forEach((userEduData) => {
    let userEducationContainer = document.createElement("div");
    userEducationContainer.classList.add("education");
    userEducationContainer.id = userEduData.userEducationId;

    // setting data in container
    let userEducationContent = `<h3 class="education-degree-title">${userEduData.userEducationDegree}</h3>
      <div class="education-degree-program"><b>Degree Program -</b> <span>${userEduData.userEducationProgram}</span></div>
      <div class="education-degree-institute"><b>Degree Institute -</b> <span>${userEduData.userEducationInstitute}</span></div>
      <div class="education-degree-years"><b>Degree Duration -</b> <span>${userEduData.userEducationYears}</span></div>
      <div class="education-degree-btns"><button class="education-delete-btn">Delete</button><button class="education-update-btn">Update</button></div>`;

    userEducationContainer.innerHTML = userEducationContent;

    allEducationsContainer.appendChild(userEducationContainer);

    // updating data in container
    const updateEducationBtn = userEducationContainer.querySelector(
      ".education-update-btn"
    );

    // adding data in modal's input fields for updation
    updateEducationBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      educationIdForUpdate = userEduData.userEducationId;
      console.log(educationIdForUpdate);

      document.querySelector(".update-education-degree").value =
        userEduData.userEducationDegree;
      document.querySelector(".update-education-program").value =
        userEduData.userEducationProgram;
      document.querySelector(".update-education-institute").value =
        userEduData.userEducationInstitute;
      document.querySelector(".update-education-years").value =
        userEduData.userEducationYears;

      updateEducationModal.showModal();
      refreshEducationContainer();
    });

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
      localStorage.setItem(
        "userEducationsData",
        JSON.stringify(usersEducationData)
      );
      console.log("chidvochd", usersEducationData);

      refreshEducationContainer();
    });
  });
};
refreshEducationContainer();

// ____________EXPERIENCES______________

// let usersExperienceData = [];
let usersExperienceData = JSON.parse(
  localStorage.getItem("userExperiencesData")
);

const addExperienceModal = document.querySelector("#add-new-experience-modal");
const updateExperienceModal = document.querySelector(
  "#update-experience-modal"
);
const addExperienceModalForm = document.querySelector(
  "#add-new-experience-modal form"
);
const updateExperienceModalForm = document.querySelector(
  "#update-experience-modal form"
);
const addExperienceModalFormSubmit = document.querySelector(
  "#add-new-experience-modal form button"
);
const updateExperienceModalFormSubmit = document.querySelector(
  "#update-experience-modal form button"
);
const addExperienceBtn = document.querySelector(".add-new-experience-btn");
const addExperienceModalCloseBtn = document.querySelector(
  ".add-new-experience-close-btn"
);
const updateExperienceModalCloseBtn = document.querySelector(
  ".update-experience-close-btn"
);

addExperienceModalCloseBtn.addEventListener("click", (e) => {
  addExperienceModal.close();
});
updateExperienceModalCloseBtn.addEventListener("click", (e) => {
  updateExperienceModal.close();
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

  if (
    !experienceFormData.get("experience-title") ||
    !experienceFormData.get("experience-company") ||
    !experienceFormData.get("experience-skills") ||
    !experienceFormData.get("experience-years")
  ) {
    alert("Some fields are empty");
  } else {
    userExperienceData.userExperienceId = generateExperienceId();
    userExperienceData.userExperienceTitle =
      experienceFormData.get("experience-title");
    userExperienceData.userExperienceCompany =
      experienceFormData.get("experience-company");
    userExperienceData.userExperienceSkills =
      experienceFormData.get("experience-skills");
    userExperienceData.userExperienceYears =
      experienceFormData.get("experience-years");

    usersExperienceData.push(userExperienceData);
    localStorage.setItem(
      "userExperiencesData",
      JSON.stringify(usersExperienceData)
    );

    console.log("user", usersExperienceData);

    // _______refreshing screen______

    refreshExperienceContainer();

    addExperienceModal.close();
  }
});

// EXPERIENCE'S FUNCTIONS

let experienceIdForUpdate;

updateExperienceModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const updateExperienceFields = new FormData(
    updateExperienceModalForm,
    updateExperienceModalFormSubmit
  );

  const updatedExperienceTitle = updateExperienceFields.get(
    "update-experience-title"
  );
  const updatedExperienceCompany = updateExperienceFields.get(
    "update-experience-company"
  );
  const updatedExperienceYears = updateExperienceFields.get(
    "update-experience-years"
  );
  const updatedExperienceSkills = updateExperienceFields.get(
    "update-experience-skills"
  );

  if (
    !updatedExperienceTitle ||
    !updatedExperienceCompany ||
    !updatedExperienceYears ||
    !updatedExperienceSkills
  ) {
    alert("SOME FIELDS ARE EMPTY");
    console.log(
      updatedExperienceTitle,
      updatedExperienceCompany,
      updatedExperienceYears,
      updatedExperienceSkills
    );
  } else {
    let index = usersExperienceData.findIndex((u) => {
      return u.userExperienceId === experienceIdForUpdate;
    });

    console.log("old", usersExperienceData, index);

    usersExperienceData[index].userExperienceTitle = updatedExperienceTitle;
    usersExperienceData[index].userExperienceCompany = updatedExperienceCompany;
    usersExperienceData[index].userExperienceSkills = updatedExperienceSkills;
    usersExperienceData[index].userExperienceYears = updatedExperienceYears;

    console.log("new", usersExperienceData, index);

    localStorage.setItem(
      "userExperiencesData",
      JSON.stringify(usersExperienceData)
    );

    refreshExperienceContainer();
    updateExperienceModal.close();
  }
});

let allExperiencesContainer = document.querySelector(".all-experiences");
const refreshExperienceContainer = () => {
  let filteredUserExperiencesData = usersExperienceData.filter(
    (userEd) => userEd.userId === user.userId
  );
  allExperiencesContainer.innerHTML = "";
  // usersExperienceData.forEach((userExpData) => {
  filteredUserExperiencesData.forEach((userExpData) => {
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

    // adding data in modal's input fields for updation
    userExperienceUpdate.addEventListener("click", (e) => {
      e.stopPropagation();
      updateExperienceModal.showModal();
      experienceIdForUpdate = userExpData.userExperienceId;

      document.querySelector(
        "#update-experience-modal .update-experience-title"
      ).value = userExpData.userExperienceTitle;
      document.querySelector(
        "#update-experience-modal .update-experience-company"
      ).value = userExpData.userExperienceCompany;
      document.querySelector(
        "#update-experience-modal .update-experience-skills"
      ).value = userExpData.userExperienceSkills;
      document.querySelector(
        "#update-experience-modal .update-experience-years"
      ).value = userExpData.userExperienceYears;

      refreshExperienceContainer();
    });

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

      usersExperienceData.forEach((u) => {
        console.log(
          u.id,
          typeof u.id,
          userExperienceId,
          typeof userExperienceId
        );
      });

      console.log("chidvochd", usersExperienceData);
      localStorage.setItem(
        "userExperiencesData",
        JSON.stringify(usersExperienceData)
      );

      refreshExperienceContainer();
    });
  });
};

refreshExperienceContainer();

// ____________SKILLS______________

// let userSkillsData = [];
let userSkillsData = JSON.parse(
  localStorage.getItem("loggedInUser")
).userSkills;

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

  if (!addSkillFormInput.value) {
    alert("Skill input field is empty");
  } else {
    userSkillsData.push(addSkillFormInput.value);
    user.userSkills = userSkillsData;
    allUsersData[userIndex] = user;
    localStorage.setItem("usersData", JSON.stringify(allUsersData));
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    console.log(userSkillsData);

    // refresh

    refreshSkillsContainer();
  }
});

const refreshSkillsContainer = () => {
  allSkillsContainer.innerHTML = "";
  // let loggedInUser = JSON.parse(localStorage.getItem("usersData"));
  // let skills = loggedInUser.userSkills;

  userSkillsData.forEach((userSkill) => {
    // loggedInUser.userSkills.forEach((userSkill) => {
    let userSkillContainer = document.createElement("li");
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
      // let userSkills = JSON.parse(localStorage.getItem("usersData"))
      // userSkills = userSkills.userSkills;
      let userSkillId = userSkillDelete.parentNode.id;
      console.log("chidvochd", userSkillsData);
      console.log("1", userSkillsData);
      userSkillsData = userSkillsData.filter((skill) => {
        console.log(skill, userSkillId);
        return skill !== userSkillId;
      });
      console.log("1", userSkillsData);
      user.userSkills = userSkillsData;
      allUsersData[userIndex] = user;
      localStorage.setItem("usersData", JSON.stringify(allUsersData));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      console.log("chidvochd", userSkillsData);

      refreshSkillsContainer();
    });
  });
};

refreshSkillsContainer();

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

  if (
    !updateUserNameInput.value ||
    !updateUserNumberInput.value ||
    !updateUserEmailInput.value ||
    !updateUserPasswordInput.value ||
    !updateUserProfessionInput.value ||
    !updateUserAboutInput.value
  ) {
    alert("Some fields are empty");
  } else {
    user.userName = updateUserNameInput.value;
    user.userNumber = updateUserNumberInput.value;
    user.userEmail = updateUserEmailInput.value;
    user.userPassword = updateUserPasswordInput.value;
    user.userProfession = updateUserProfessionInput.value;
    user.userAbout = updateUserAboutInput.value;
    // user.userImgSrc = updateUserImgSrcInput.value;

    // let userPortfolioImg = updateUserImgSrcInput.files[0]
    // if(userPortfolioImg) {
    //   user.userImgSrc = URL.createObjectURL(userPortfolioImg);
    // }

    // updateUserImgSrcInput.addEventListener("change", () => {
    //   console.log("HELLO");
    //   let imgFile = updateUserImgSrcInput.files[0];
    //   let reader = new FileReader();

    //   reader.onload = function(e) {
    //     user.userImgSrc = e.target.result;
    //   }
    //   reader.readAsDataURL(imgFile);
    // console.log("user.userImgSrc",user.userImgSrc);
    // })

    let imgFile = updateUserImgSrcInput.files[0];
    // will user FileReader() to read and get base 64 image's link
    let reader = new FileReader();

    reader.onload = function (e) {
      // storing base 64 image link generated
      user.userImgSrc = e.target.result;

      // Since reader.onload event function that is passed executes asynchronously and it executes when file reading process completes so due to that delat rest of the code (below) would run before it could save image's linkto user.userImgSrc that's why all the rest of the code (below) is dependent on the imgSrc to be sotred and tht's why instead writing rest of the code inside of onload event function instead of outside as rest of the code would execute first
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

      updatePortfolioModal.close();
    };
    // method reads the contents of the specified file and converts it to a data URL, which is a string representation of the file's data. This data URL can be used to display the image in an HTML 
    reader.readAsDataURL(imgFile);
  }
});

updatePortfolioModalClose.addEventListener("click", (e) => {
  updatePortfolioModal.close();
});

const refreshUserProfile = () => {
  //   const heroUserNameSpan = document.querySelector(".hero-user-name")
  // const heroUserProfessionSpan = document.querySelector(".hero-user-profession")
  // const aboutMeUserImage = document.querySelector(".about-me-user-image")
  // const aboutMeUserAbout = document.querySelector(".about-me-text p")

  document.querySelector(".hero-user-name").innerText = user.userName;
  document.querySelector(".hero-user-profession").innerText =
    user.userProfession;
  document.querySelector(".about-me-text p").innerText = user.userAbout;
  document.querySelector(
    ".contact-links .user-whatsapp"
  ).href = `https://wa.me/${user.userNumber}`;
  document.querySelector(
    ".contact-links .user-email"
  ).href = `mailto://${user.userEmail}`;

  // const image = new Image();
  // image.src = user.userImgSrc;
  // document.querySelector(
  //   ".about-me-user-image"
  // ).innerHTML = ""
  // document.querySelector(
  //   ".about-me-user-image"
  // ).appendChild(image)

  console.log("img link", user.userImgSrc);
  let img = document.createElement("img");
  img.src = user.userImgSrc;
  document.querySelector(".about-me-user-image").innerHTML = "";
  document.querySelector(".about-me-user-image").appendChild(img);
  // document.querySelector(
  //   ".about-me-user-image"
  // ).innerHTML = `<img src=${user.userImgSrc} alt="" />`;
};

refreshUserProfile();
