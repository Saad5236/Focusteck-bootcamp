import db from "../config.js";

const generateUserId = async () => {
  let id, col;
  try {
    col = await getUsersColumn("userId");

    console.log("FHKBEK", col);
  } catch (error) {
    console.log("UFEBFBE", error);
  }
  while (true) {
    id = Math.floor(Math.random() * (99999999 - 10) + 10);

    if (col.length > 0 && col.find((i) => i === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

const getUsers = async () => {
  const getUsersQuery = `SELECT * FROM users`;

  try {
    let [users] = await db.query(getUsersQuery);
    console.log("USERS DATA", users);
    return users;
  } catch (error) {
    console.log("error", error);
  }

  //   db.query(getAllUsers, (error, result, fields) => {
  //     if (error) console.log("ERROR GETTING USERS: ", error);
  //     else {
  //       console.log(
  //         "ALL USERS DATA!",
  //         result[0],
  //         result[0].user_id,
  //         result[0].user_role
  //       );
  //       return result;
  //     }
  //   });
};

const getUsersColumn = async (column) => {
  const getUsersQuery = `SELECT ? FROM users`;

  try {
    let [usersCol] = await db.query(getUsersQuery, [column]);
    console.log("USERS DATA", usersCol);
    return usersCol;
  } catch (error) {
    console.log("error", error);
  }
};

const addUser = async (userData) => {
  let allUsers = await getUsers();

  if (
    allUsers.length > 0 &&
    allUsers.some((u) => u.userEmail === userData.userEmail)
  ) {
    console.log("NO ITS A DUPLICATE EMAIL YOU CANT DIE");
  } else {
    const addUserQuery = `INSERT INTO users (userId, userRole, userName, userEmail, userNumber, userPassword) values (?, ?, ?, ?, ?, ?);`;
    const userId = await generateUserId();
    console.log("USERID", userId);
    const values = [
      userId,
      userData.userRole,
      userData.userName,
      userData.userEmail,
      userData.userNumber,
      userData.userPassword,
    ];
    try {
      let [addedUser] = await db.query(addUserQuery, values);
      console.log("user DATA", addedUser);
      return addedUser;
    } catch (error) {
      console.log("error", error);
    }
  }
};

const updateUser = async (userId, userData) => {
  const updateUserQuery = `
    UPDATE users
    SET userRole = ?, userName = ?, userEmail = ?, userNumber = ?, userPassword = ?, userImgSrc = ?, userAbout = ?, userProfession = ?
    WHERE userId = ?
  `;
  const values = [
    userData.userRole,
    userData.userName,
    userData.userEmail,
    userData.userNumber,
    userData.userPassword,
    userData.userImgSrc,
    userData.userAbout,
  ];

  try {
    const [result] = await db.query(updateUserQuery, values);

    if (result.affectedRows === 1) {
      console.log("User data updated successfully");
      return true;
    } else {
      console.log("User data not updated");
      return false;
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

const deleteUser = async (userId) => {
  const deleteUserQuery = `DELETE FROM users WHERE userId = ?`;
  try {
    let [result] = await db.query(deleteUserQuery, [userId]);

    if (result.affectedRows === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export default { getUsers, addUser, updateUser, deleteUser };
