import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

export const connectDB = async () => {
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log("MySQL Database Connected successfully");
    });
};

export default db;