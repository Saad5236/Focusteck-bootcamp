const PORT = process.env.PORT || 3000;
const http = require("http");
const getRequest = require("./methods/get-request.js");
const postRequest = require("./methods/post-request.js");
const deleteRequest = require("./methods/delete-request.js");
const putRequest = require("./methods/put-request.js");
let users = require("./data/users.json")
let projects = require("./data/projects.json")
// let educations = require("./data/educations.json")
// let experiences = require("./data/experiences.json")

let server = http.createServer((req, res) => {
    req.users = users;
    req.projects = projects;
    // req.educations = educations;
    // req.experiences = experiences;

  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json"); // to send our response in json format then
      res.write(JSON.stringify({ title: "Not found", message: "Route not found" }));
      res.end();
  }
});

// running server on port 3000
server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
