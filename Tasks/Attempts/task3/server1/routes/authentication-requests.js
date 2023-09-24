// import jwt from "jsonwebtoken";

import authenticationControllers from "../controllers/users.js";
// import requestBodyParser from "../utils/body-parser.js";
// import users from "../data/users.json" assert { type: "json" };
// let usersData = users;
// // const secretKey = "my-secret-key";

export default async (req, res) => {
  console.log("POST HELO");

  if (req.url.split("/")[2] === "login" && req.method === "POST") {
    authenticationControllers.loginUser(req, res);
  } else {
    console.log("SIGNUP user 1");
    authenticationControllers.signupUser(req, res, "signup");
  }
};
