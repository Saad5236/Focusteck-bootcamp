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

import requestBodyParser from "../utils/body-parser.js";
import users from "../data/users.json" assert { type: "json" };
let usersData = users;

export default async (req, res) => {
  let userId = Number(req.url.split("/")[3]);

  if (req.url === "/api/users" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(usersData));
    res.end();
  } 
  else if (req.method === "POST") {
    console.log("POST");
    try {
      let body = await requestBodyParser(req);
      body.userId = generateUserId();
      usersData.push(body);
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
  }
  else if (userId && req.method === "GET") {
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
  } else if (!userId) {
      console.log("FAILED TO GET VALID ID");

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "ID is not valid, so can't find user based on userId",
      })
    );
  } else if (userId && req.method === "DELETE") {
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
  } else if (userId && req.method === "PUT") {
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
  }  else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not found", message: "Route not found!" })
    );
  }
};
