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
  
  import requestBodyParser from "../utils/body-parser.js";
  import experiences from "../data/experiences.json" assert { type: "json" };
  
  export default async (req, res) => {
    if (req.url === "/api/experiences" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.write(JSON.stringify(experiences));
      res.end();
    } else if (req.method === "POST") {
      try {
        let body = await requestBodyParser(req);
        body.userExperienceId = generateExperienceId();
        experiences.push(body);
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
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not found", message: "Route not found!" })
      );
    }
  };