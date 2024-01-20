import mysql from "mysql2"

export const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Ljubljana2023",
    database: "social_media"


})