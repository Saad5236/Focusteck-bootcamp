// get the client
const mysql = require("mysql2");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Handle HTTP requests here

  // Example: Serve static files (HTML, CSS, JS)
  const filePath = path.join(__dirname, req.url);
  if (req.url === "/" || req.url === "/index.html") {
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("index.html").pipe(res);
  }
});

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_test_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
