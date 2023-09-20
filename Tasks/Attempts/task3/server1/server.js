const PORT = 3000;
import { log } from "console";
import http from "http";
import usersRequests from "./methods/users-requests.js";
import projectsRequests from "./methods/projects-requests.js";
import educationsRequests from "./methods/educations-requests.js";
import experiencesRequests from "./methods/experiences-requests.js";

// const http = require("http");
// const getRequest = require("./methods/get-request.js");
// const postRequest = require("./methods/post-request.js");
// const deleteRequest = require("./methods/delete-request.js");
// const putRequest = require("./methods/put-request.js");
// let users = require("./data/users.json")
// let projects = require("./data/projects.json")
// // let educations = require("./data/educations.json")
// // let experiences = require("./data/experiences.json")

let server = http.createServer((req, res) => {
  let urlType = req.url.split("/")[2];

  if (urlType === "users") {
    usersRequests(req, res);
  } else if (urlType === "projects") {
    projectsRequests(req, res);
  } else if (urlType === "experiences") {
    experiencesRequests(req, res);
  } else if (urlType === "educations") {
    educationsRequests(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json"); // to send our response in json format then
    res.write(
      JSON.stringify({ title: "Not found", message: "Route not found" })
    );
    res.end();
  }

  //   req.users = users;
  //   req.projects = projects;
  //   // req.educations = educations;
  //   // req.experiences = experiences;

  // switch (req.method) {
  //   case "GET":
  //     getRequest(req, res);
  //     break;
  //   case "POST":
  //     postRequest(req, res);
  //     break;
  //   case "DELETE":
  //     deleteRequest(req, res);
  //     break;
  //   case "PUT":
  //     putRequest(req, res);
  //     break;
  //   default:
  //     res.statusCode = 404;
  //     res.setHeader("Content-Type", "application/json"); // to send our response in json format then
  //     res.write(JSON.stringify({ title: "Not found", message: "Route not found" }));
  //     res.end();
  // }
});

// running server on port 3000
server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
