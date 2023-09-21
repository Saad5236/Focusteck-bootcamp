// import jwt from "jsonwebtoken";

import authenticationControllers from "../controllers/users.js"
// import requestBodyParser from "../utils/body-parser.js";
// import users from "../data/users.json" assert { type: "json" };
// let usersData = users;
// // const secretKey = "my-secret-key";

export default async (req, res) => {
  console.log("POST HELO");

  if (req.url.split("/")[2] === "login" && req.method === "POST") {
    authenticationControllers.loginUser(req, res);

    // console.log("POST");
    // try {
    //   let body = await requestBodyParser(req);
    //   console.log(body);
    //   let foundUser = usersData.find(
    //     (user) =>
    //       user.userEmail === body.userEmail &&
    //       user.userPassword === body.userPassword
    //   );

    //   if (!foundUser) {
    //     res.writeHead(401, { "Content-Type": "application/json" });
    //     res.end(
    //       JSON.stringify({
    //         title: "Authentication Failed",
    //         message: "User's email or/and password is/are incorrect.",
    //       })
    //     );
    //   } else {
    //     let authToken = jwt.sign(
    //       {
    //         userId: foundUser.userId,
    //         userRole: foundUser.userRole,
    //         userEmail: foundUser.userEmail,
    //       },
    //       "my-secret-key"
    //     );
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.end(
    //       JSON.stringify({
    //         authToken, userData: foundUser
    //       })
    //     );
    //   }
    // } catch (err) {
    //   console.log(err);
    //   res.writeHead(400, { "Content-Type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       title: "Validation Failed",
    //       message: "Request body is not valid",
    //     })
    //   );
    // }
  } else {
    authenticationControllers.signupUser(req, res);
  }
};
