import mysql from "mysql2";

let db = "";

const connectDb = () => {
return mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});
}
db = connectDb()
export default {db, connectDb};