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
        userImgSrc VARCHAR(255)
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
};

export default createDbTables;
