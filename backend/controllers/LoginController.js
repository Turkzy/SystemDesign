import Admin from "../models/AdminModel.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({
            where: { username }
        });
        if (admin) {
            if (admin.password === password) {
                res.status(200).json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(401).json({ message: "Username not found" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* GET */
export const getAdmins = async (req, res) => {
    try {
        const response = await Admin.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* GET BY ID */
export const getAdminById = async (req, res) => {
    try {
        const response = await Admin.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* SAVE */
export const saveAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        await Admin.create({ username, password });
        res.status(201).json({ message: "Admin Created Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* UPDATE */
export const updateAdmin = async (req, res) => {
    try {
        await Admin.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Admin Updated Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* DELETE */
export const deleteAdmin = async (req, res) => {
    try {
        await Admin.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "Admin Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
