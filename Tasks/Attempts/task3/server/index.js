const PORT = process.env.PORT || 3000;
import http from "http";
import data from "./db/users.json" assert { type: "json" };

let server = http.createServer((req, res) => {
  // res.writeHead(200, { "Content-Type": "text/html" }); // to send our response in html format then
  res.writeHead(200, { "Content-Type": "text/json" }); // to send our response in json format then

  if (req.method === "GET") {
    if (req.url === "/users") {
      res.statusCode = 200; // OK request
      res.end(JSON.stringify(data.usersData));
    }
  } else if (req.method === "POST") {
    if (req.url === "/users") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const newUser = JSON.parse(body);
          data.usersData.push(newUser);
          res.statusCode = 201; // data is created in backend
          res.end(JSON.stringify(data.usersData));
        } catch (e) {
          console.log("Error", e);
          res.statusCode = 400; // bad request: invalid format of json
          res.end(
            JSON.stringify({
              error: "Invalid json format is used, to store data",
            })
          );
        }
      });
    }
  }
});

// running server on port 3000
server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
