const generateEducationId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    //   let usersData = req.users;

    if (educations && educations.find((i) => i.userEducationId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

import requestBodyParser from "../utils/body-parser.js";
import educations from "../data/educations.json" assert { type: "json" };
import users from "../data/users.json" assert { type: "json" };
let educationsData = educations;

export default async (req, res) => {
  if (req.url.split("/")[3] === "user")
    var userId = Number(req.url.split("/")[4]);
  if (req.url.split("/")[3] === "education")
    var userEducationId = Number(req.url.split("/")[4]);

  if (req.url === "/api/educations" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(educationsData));
    res.end();
  } else if (userEducationId && req.method === "GET") {
    let education = educationsData.find(
      (education) => education.userEducationId === userEducationId
    );
    if (education) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(education));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "education not found",
          message: "education you're trying to find does not exist.",
        })
      );
    }
  } else if (userId && req.method === "GET") {
    let educations = educationsData.filter(
      (education) => education.userId === userId
    );
    if (educations.length > 0) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(educations));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "user not found",
          message: "user you're trying to find does not exist.",
        })
      );
    }
  } else if (userId && req.method === "POST") {
    if (!users.find((u) => u.userId === userId)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "User not found",
          message: "User for which you are adding project does not exist.",
        })
      );
    }

    try {
      let body = await requestBodyParser(req);
      body.userEducationId = generateEducationId();
      body.userId = userId;
      educationsData.push(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
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
  } else if (userEducationId && req.method === "DELETE") {
    res.setHeader("Content-Type", "application/json");

    let removedEducation = educationsData.find(
      (education) => education.userEducationId === userEducationId
    );
    if (removedEducation) {
      educationsData = educationsData.filter(
        (education) => education.userEducationId !== userEducationId
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(removedEducation));
      res.end();
      console.log("removedEducation", removedEducation);
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "education not found in database",
        })
      );
      res.end();
    }
  } else if (userId && req.method === "DELETE") {
    res.setHeader("Content-Type", "application/json");

    let removedEducations = educationsData.filter(
      (education) => education.userId === userId
    );
    if (removedEducations.length > 0) {
      educationsData = educationsData.filter(
        (education) => education.userId !== userId
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(removedEducations));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "User's educations not found in database",
        })
      );
      res.end();
    }
  } else if (userEducationId && req.method === "PUT") {
    try {
      let body = await requestBodyParser(req);
      let updateEducationIndex = educationsData.findIndex(
        (u) => u.userEducationId === userEducationId
      );

      if (updateEducationIndex === -1) {
        console.log("NOOO");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "education not found",
            message: "education you're trying to update does not exist.",
          })
        );
        // res.statusCode = 404;
        // res.write(
        //   JSON.stringify({ title: "Not Found", message: "education not found" })
        // );
      } else {
        console.log("YES");
        body.userEducationId = userEducationId;
        educationsData[updateEducationIndex] = body;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(educationsData[updateEducationIndex]));
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
  } else if (!userId || !userEducationId) {
    console.log("FAILED TO GET VALID ID");

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "ID is not valid, so can't find user/education based on id",
      })
    );
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not found", message: "Route not found!" })
    );
  }
};
