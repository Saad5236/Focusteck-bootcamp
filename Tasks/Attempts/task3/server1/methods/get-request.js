module.exports = (req, res) => {
    if(req.url === "/api/users") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.write(JSON.stringify(req.users));
        res.end();
    } else if(req.url === "/api/projects") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.write(JSON.stringify(req.projects));
        res.end();
    } else {
        res.writeHead(404, {"Content-type": "application/json"})
        res.end(JSON.stringify({title: "Not found", message: "Route not found!"}));
    }
}