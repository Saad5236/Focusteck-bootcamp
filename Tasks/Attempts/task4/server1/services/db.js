import db from "../config.js";

const createDbTables = async () => {
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        userId INT PRIMARY KEY,
        userRole VARCHAR(255) NOT NULL,
        userName VARCHAR(255) NOT NULL,
        userEmail VARCHAR(255) NOT NULL,
        userNumber VARCHAR(15) NOT NULL,
        userPassword VARCHAR(255) NOT NULL,
        userProfession VARCHAR(255),
        userAbout TEXT,
        userImgSrc LONGBLOB
      )
    `;
  const sessionTableQuery = `
    CREATE TABLE IF NOT EXISTS sessions (
        userId INT NOT NULL,
        token varchar(255) PRIMARY KEY,
        FOREIGN KEY (userId) REFERENCES users(userId)
      )
    `;

  const educationsTableQuery = `
    CREATE TABLE IF NOT EXISTS educations (
      userEducationId INT PRIMARY KEY,
      userId INT NOT NULL,
      userEducationDegree VARCHAR(255) NOT NULL,
      userEducationInstitute VARCHAR(255) NOT NULL,
      userEducationProgram VARCHAR(255) NOT NULL,
      userEducationYears VARCHAR(255) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId)
      )
    `;

    const experiencesTableQuery = `
    CREATE TABLE IF NOT EXISTS experiences (
      userExperienceId INT PRIMARY KEY,
      userId INT NOT NULL,
      userExperienceCompany VARCHAR(255) NOT NULL,
      userExperienceSkills VARCHAR(255) NOT NULL,
      userExperienceTitle VARCHAR(255) NOT NULL,
      userExperienceYears VARCHAR(255) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId)
      )
    `;
    
    const skillsTableQuery = `
    CREATE TABLE IF NOT EXISTS skills (
      userSkillId INT PRIMARY KEY,
      userId INT NOT NULL,
      userSkill VARCHAR(255) NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(userId)
      )
    `;

  //   db.query(userTableQuery, (error, result, fields) => {
  //     if (error) console.log("ERROR CREATING USER TABLE: ", error);
  //     else {
  //       console.log("USER TABLE SUCCESSFULLY CREATED!", result);
  //     }
  //   });

  try {
    await db.query(userTableQuery);
  } catch (error) {
    console.log("ERROR CREATING USER TABLE", error);
  }

  try {
    await db.query(sessionTableQuery);
  } catch (error) {
    console.log("ERROR CREATING SESSIONS TABLE", error);
  }

  try {
    await db.query(educationsTableQuery);
  } catch (error) {
    console.log("ERROR CREATING EDUCATIONS TABLE", error);
  }

  try {
    await db.query(experiencesTableQuery);
  } catch (error) {
    console.log("ERROR CREATING EXPERIENCES TABLE", error);
  }

  try {
    await db.query(skillsTableQuery);
  } catch (error) {
    console.log("ERROR CREATING SKILLS TABLE", error);
  }
};

export default createDbTables;
