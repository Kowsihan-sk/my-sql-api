import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import db from "../config/db.js";

export const signup = async (req, res) => {
    try {
        validationResult(req).throw();

        const { username, email, password: plain_password } = req.body;

        db.query("SELECT email FROM users WHERE email = ?", [email], async (err, result) => {
            try {
                if (result.length > 0) {
                    return res.status(400).json({ message: "email already exists, use a different email" });
                }

                const password = await bcrypt.hash(plain_password, 10);

                db.query("INSERT INTO users SET ?", { username: username, email: email, password: password }, (er, finalResult) => {
                    if (er) {
                        console.error(er);
                        return res.status(500).json({ message: err });
                    }
                    return res.status(200).json({ message: "User added successfully" });
                });
            } catch {
                console.error(err);
                return res.status(500).json({ message: err });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const login = async (req, res) => {
    try {
        validationResult(req).throw();

        const { email, password } = req.body;

        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
            try {
                if (result.length < 1) {
                    return res.status(400).json({ message: "email doesn't exists, use a different email" });
                }

                if (await bcrypt.compare(password, result[0].password)) {
                    return res.status(200).json({ message: "user login successfull" });
                }

                return res.status(401).json({ message: "Invalid email/password" });
            } catch {
                console.error(err);
                return res.status(500).json({ message: err });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        db.query(`SELECT username, email FROM users`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json(result);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}