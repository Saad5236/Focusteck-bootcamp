const generateUserId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    //   let usersData = req.users;

    if (users && users.find((i) => i.userId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

import jwt from "jsonwebtoken";
import requestBodyParser from "../utils/body-parser.js";
import users from "../data/users.json" assert { type: "json" };
let usersData = users;

const loginUser = async (req, res) => {
  console.log("POST");
  try {
    let body = await requestBodyParser(req);
    console.log(body);
    let foundUser = usersData.find(
      (user) =>
        user.userEmail === body.userEmail &&
        user.userPassword === body.userPassword
    );

    if (!foundUser) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Authentication Failed",
          message: "User's email or/and password is/are incorrect.",
        })
      );
    } else {
      delete foundUser.userPassword;
      let authToken = jwt.sign(
        {
          userId: foundUser.userId,
          userRole: foundUser.userRole,
          userEmail: foundUser.userEmail,
        },
        "my-secret-key"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          authToken,
          userData: foundUser,
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not valid",
      })
    );
  }
};

const signupUser = async (req, res) => {
  console.log("POST signup");
  try {
    let body = await requestBodyParser(req);
    body.userId = generateUserId();

    if (usersData.some((user) => user.userEmail === body.userEmail)) {
      res.writeHead(409, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Duplicate email",
          message: "A user already exists with same email.",
        })
      );
    } else {
      console.log("POST signup");
      usersData.push(body);

      console.log("login too 1", usersData);

      let authToken = jwt.sign(
        {
          userId: body.userId,
          userRole: body.userRole,
          userEmail: body.userEmail,
        },
        "my-secret-key"
      );
      console.log("login too 2", authToken);

      // delete body.userPassword;

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          authToken,
          userData: body,
        })
      );
    }
    // res.writeHead(201, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(body));
  } catch (err) {
    console.log(err);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not valid",
      })
    );
  }
};

const getAllUsers = async (req, res) => {
  res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(usersData));
    res.end();
}

const getUser = async (req, res, userId) => {
  res.setHeader("Content-Type", "application/json");

    let user = usersData.find((u) => u.userId === userId);

    if (user) {
      res.statusCode = 200;
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "User not found in database",
        })
      );
      res.end();
    }
}

const deleteUser = async (req, res, userId) => {
  res.setHeader("Content-Type", "application/json");

    let removedUser = usersData.find((u) => u.userId === userId);
    // usersData = usersData.filter((u) => u.userId !== userId);

    // if (usersData.length > 0) {
    if (removedUser) {
      // res.statusCode = 200;
      // res.write(JSON.stringify(removedUser));
      // res.end();
      usersData = usersData.filter((u) => u.userId !== userId);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(removedUser));
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "User not found in database",
        })
      );
      res.end();
    }
}

const updateUser = async (req, res, userId) => {
  try {
    let body = await requestBodyParser(req);
    let updateUserIndex = usersData.findIndex((u) => u.userId === userId);

    if (updateUserIndex === -1) {
      console.log("NOOO");
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "User not found" })
      );
    } else {
      console.log("YES");
      body.userId = userId;
      usersData[updateUserIndex] = body;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(usersData[updateUserIndex]));
    }
  } catch (e) {
    console.log(e);
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Request body is not in valid format",
      })
    );
  }
}

const returnError = (req, res, statusCode, title, message) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: title,
        message: message,
      })
    );
}

export default { loginUser, signupUser, getAllUsers, getUser, deleteUser, updateUser, returnError };
