// export default async (req, res) => {};
const generateExperienceId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    //   let usersData = req.users;

    if (experiences && experiences.find((i) => i.userExperienceId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

import experienceControllers from "../controllers/experiences.js";
import requestBodyParser from "../utils/body-parser.js";
import experiences from "../data/experiences.json" assert { type: "json" };
import users from "../data/users.json" assert { type: "json" };
let experiencesData = experiences;

export default async (req, res) => {
  if (req.url.split("/")[5] === undefined) {
    if (req.url.split("/")[3] === "user")
      var userId = Number(req.url.split("/")[4]);
    if (req.url.split("/")[3] === "experience")
      var userExperienceId = Number(req.url.split("/")[4]);

    // if (req.url === "/api/experiences" && req.method === "GET") {
    //   res.statusCode = 200;
    //   res.setHeader("Content-type", "application/json");
    //   res.write(JSON.stringify(experiencesData));
    //   res.end();
    // }

    // if (userId && req.method === "GET") {
    if (userId && req.method === "GET") {
      experienceControllers.getExperiencesByUserId(req, res, userId);

      // let experiences = experiencesData.filter(
      //   (experience) => experience.userId === userId
      // );
      // if (experiences.length > 0) {
      //   res.writeHead(201, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify(experiences));
      //   res.end();
      // } else {
      //   res.writeHead(404, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       title: "user not found",
      //       message: "user you're trying to find does not exist.",
      //     })
      //   );
      // }
    } else if (userExperienceId && req.method === "GET") {
      experienceControllers.getExperienceByExperienceId(
        req,
        res,
        userExperienceId
      );

      // let experience = experiencesData.find(
      //   (experience) => experience.userExperienceId === userExperienceId
      // );
      // if (experience) {
      //   res.writeHead(201, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify(experience));
      //   res.end();
      // } else {
      //   res.writeHead(404, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       title: "experience not found",
      //       message: "experience you're trying to find does not exist.",
      //     })
      //   );
      // }
    } else if (userId && req.method === "POST") {
      experienceControllers.addExperience(req, res, userId);
      // if (!users.find((u) => u.userId === userId)) {
      //   res.writeHead(404, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       title: "User not found",
      //       message: "User for which you are adding experience does not exist.",
      //     })
      //   );
      // }

      // try {
      //   let body = await requestBodyParser(req);
      //   body.userExperienceId = generateExperienceId();
      //   body.userId = userId;
      //   experiencesData.push(body);
      //   res.writeHead(201, { "Content-Type": "application/json" });
      //   res.end();
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
    } else if (userExperienceId && req.method === "DELETE") {
      experienceControllers.deleteExperienceByExperienceId(
        req,
        res,
        userExperienceId
      );

      // res.setHeader("Content-Type", "application/json");

      // let removedExperience = experiencesData.find(
      //   (experience) => experience.userExperienceId === userExperienceId
      // );
      // if (removedExperience) {
      //   experiencesData = experiencesData.filter(
      //     (experience) => experience.userExperienceId !== userExperienceId
      //   );

      //   res.writeHead(200, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify(removedExperience));
      //   res.end();
      //   console.log("removedExperience", removedExperience);
      // } else {
      //   res.statusCode = 404;
      //   res.write(
      //     JSON.stringify({
      //       title: "Not Found",
      //       message: "experience not found in database",
      //     })
      //   );
      //   res.end();
      // }
    } else if (userId && req.method === "DELETE") {
      experienceControllers.deleteExperiencesByUserId(req, res, userId);

      // res.setHeader("Content-Type", "application/json");

      // let removedExperiences = experiencesData.filter(
      //   (experience) => experience.userId === userId
      // );
      // if (removedExperiences.length > 0) {
      //   experiencesData = experiencesData.filter(
      //     (experience) => experience.userId !== userId
      //   );

      //   res.writeHead(200, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify(removedExperiences));
      //   res.end();
      // } else {
      //   res.statusCode = 404;
      //   res.write(
      //     JSON.stringify({
      //       title: "Not Found",
      //       message: "User's experiences not found in database",
      //     })
      //   );
      //   res.end();
      // }
    } else if (userExperienceId && req.method === "PUT") {
      experienceControllers.updateExperienceByExperienceId(
        req,
        res,
        userExperienceId
      );

      // try {
      //   let body = await requestBodyParser(req);
      //   let updateExperienceIndex = experiencesData.findIndex(
      //     (u) => u.userExperienceId === userExperienceId
      //   );

      //   if (updateExperienceIndex === -1) {
      //     console.log("NOOO");
      //     res.writeHead(404, { "Content-Type": "application/json" });
      //     res.end(
      //       JSON.stringify({
      //         title: "experience not found",
      //         message: "experience you're trying to update does not exist.",
      //       })
      //     );
      //     // res.statusCode = 404;
      //     // res.write(
      //     //   JSON.stringify({ title: "Not Found", message: "experience not found" })
      //     // );
      //   } else {
      //     console.log("YES");
      //     body.userExperienceId = userExperienceId;
      //     experiencesData[updateExperienceIndex] = body;
      //     res.writeHead(200, { "Content-Type": "application/json" });
      //     res.end(JSON.stringify(experiencesData[updateExperienceIndex]));
      //   }
      // } catch (e) {
      //   console.log(e);
      //   res.writeHead(400, { "Content-Type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       title: "Validation Failed",
      //       message: "Request body is not in valid format",
      //     })
      //   );
      // }
    } else if (
      (!userId &&
        !userExperienceId &&
        req.url === `/api/experiences/user/${req.url.split("/")[4]}`) ||
      req.url === `/api/experiences/experience/${req.url.split("/")[4]}`
    ) {
      console.log("FAILED TO GET VALID ID");

      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "ID is not valid, so can't find user/experience based on id",
        })
      );
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not found", message: "Route not found!" })
      );
    }
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not found", message: "Route not found!" })
    );
  }
};
