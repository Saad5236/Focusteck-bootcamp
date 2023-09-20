const generateProjectId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    //   let projectsData = req.users;

    if (projects && projects.find((i) => i.projectId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

import requestBodyParser from "../utils/body-parser.js";
import projects from "../data/projects.json" assert { type: "json" };
import users from "../data/users.json" assert { type: "json" };
let projectsData = projects;

export default async (req, res) => {
  // let userId, projectId;
  if (req.url.split("/")[3] === "user")
    var userId = Number(req.url.split("/")[4]);
  if (req.url.split("/")[3] === "project")
    var projectId = Number(req.url.split("/")[4]);

  console.log(userId, projectId);

  // get all projects
  if (req.url === "/api/projects" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(projectsData));
    res.end();
  } // get single project based on projectId
  else if (projectId && req.method === "GET") {
    // res.statusCode = 200;
    // res.setHeader("Content-type", "application/json");
    let project = projectsData.find(
      (project) => project.projectId === projectId
    );
    if (project) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(project));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Project not found",
          message: "Project you're trying to find does not exist.",
        })
      );
    }
  } // get multiple projects based on userId
  else if (userId && req.method === "GET") {
    let projects = projectsData.filter((project) => project.userId === userId);
    if (projects.length > 0) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(projects));
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
  } // post new project
  else if (userId && req.method === "POST") {
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
      body.projectId = generateProjectId();
      body.userId = userId;
      projects.push(body);
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
  } // delete single project based on projectId
  else if (projectId && req.method === "DELETE") {
    res.setHeader("Content-Type", "application/json");

    let removedProject = projectsData.find(
      (project) => project.projectId === projectId
    );
    if (removedProject) {
      projectsData = projectsData.filter(
        (project) => project.projectId !== projectId
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(removedProject));
      res.end();
      console.log("removedProject", removedProject);
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "Project not found in database",
        })
      );
      res.end();
    }
  } // delete multiple projects based on userId
  else if (userId && req.method === "DELETE") {
    res.setHeader("Content-Type", "application/json");

    let removedProjects = projectsData.filter(
      (project) => project.userId === userId
    );
    if (removedProjects.length > 0) {
      projectsData = projectsData.filter(
        (project) => project.userId !== userId
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(removedProjects));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "User's Projects not found in database",
        })
      );
      res.end();
    }
  } // update project
  else if (projectId && req.method === "PUT") {
    try {
      let body = await requestBodyParser(req);
      let updateProjectIndex = projectsData.findIndex(
        (u) => u.projectId === projectId
      );

      if (updateProjectIndex === -1) {
        console.log("NOOO");
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Project not found" })
        );
      } else {
        console.log("YES");
        body.projectId = projectId;
        projectsData[updateProjectIndex] = body;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(projectsData[updateProjectIndex]));
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
  } // if user enters a non numeric project/user id
  else if (!userId || !projectId) {
    console.log("FAILED TO GET VALID ID");

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "ID is not valid, so can't find user/project based on id",
      })
    );
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ title: "Not found", message: "Route not found!" })
    );
  }
};
