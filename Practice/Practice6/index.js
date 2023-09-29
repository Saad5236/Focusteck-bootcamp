import http from "http";
import config from "./config.js";

config.db.connect((err) => {
    if (err) throw err;
    
    console.log("MY SQL DB CONNECTED");
    
  });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MY SQL DB CONNECTED");
// });

// console.log(connectDb);
// config.connectDb();
// console.log("gk",config.db);
let server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/db") {
    let query = "CREATE DATABASE hello_world";
    config.db.query(query, (error, result) => {
      if (error) throw error;
      console.log("RESULT", result);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not found", message: "Route not found" })
      );
    });
  }

  else if (req.method === "GET" && req.url === "/api/db2") {
    let query = "CREATE DATABASE hello_world2";
    config.db.query(query, (error, result) => {
      if (error) throw error;
      console.log("RESULT", result);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: "Not found", message: "Route not found" })
      );
    });
  }
});

// running server on port 3000
server.listen(3000, () => {
  console.log(`server connected ${3000}`);
});
