const requestBodyParser = require("../utils/body-parser.js");

module.exports = async (req, res) => {
  const generateUserId = () => {
    let id;
    while (true) {
      id = Math.floor(Math.random() * (999999 - 100000) + 100000);
      //   let usersData = req.users;

      if (req.users && req.users.find((i) => i.userId === id)) {
        continue;
      } else {
        break;
      }
    }
    return id;
  };

  const generateProjectId = () => {
    let id;
    while (true) {
      id = Math.floor(Math.random() * (999999 - 100000) + 100000);
      //   let usersData = req.users;

      if (req.projects && req.projects.find((i) => i.projectId === id)) {
        continue;
      } else {
        break;
      }
    }
    return id;
  };

  if (req.url === "/api/users") {
    try {
      let body = await requestBodyParser(req);
      body.userId = generateUserId();
      req.users.push(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
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
  } else if (req.url === "/api/projects") {
    try {
      let body = await requestBodyParser(req);
      body.projectId = generateUserId();
      req.projects.push(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
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
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
