import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const u_id = req.params.u_id;
    const q = "SELECT * FROM users WHERE id=?";

    db.query(q, [u_id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const { password, ...info } = data[0];
        return res.json(info);
    });
};


export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

        db.query(
            q,
            [
                req.body.name,
                req.body.city,
                req.body.website,
                req.body.profilePic,
                req.body.coverPic,
                userInfo.id,
            ],
            (err, data) => {
                if (err) res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            }
        );
    });
};