const db = require('../models');
const bcrypt = require("bcrypt");

const admin = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("adminPassword", salt);
    try {
    const adminUser = await db.User.create({
            name: "Admin",
            email: "admin@email.dot",
            password: hash,
            bio: "Compte administrateur, craignez",
            admin: true
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = admin()