const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Op = db.Sequelize.Op;
const fs = require('fs');

// Hachage du MDP et enregistrement du nouvel utilisateur dans la BDD.
exports.signup = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    try {
    const [ user, created ] = await db.User.findOrCreate({ where: { email: req.body.email }, 
        defaults: {
            name: req.body.name,
            password: hash,
            ppurl: req.body.ppurl,
            bio: req.body.bio
    }});
    if (!created) return res.status(400).json({ message: "Adresse e-mail déjà attribuée." })
    } catch (err) { 
        res.status(500).json({ err });
        console.log(err);
    }
    next();
}

// Vérification des identifiants de l'utilisateur lors de la connexion.
exports.login = async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email }});
    if (user === null) {
        return res.status(401).json({ error: 'Cet addresse e-mail ne correspond à aucun compte existant.'});
    } else {
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect."});
    }
    res.status(200).json({
        userId: user.id,
        token: jwt.sign(
            { userId: user.id},
            'secret',
            { expiresIn: '24h' }
        )});
    }
};

exports.modify = async (req, res) => {
    const ppurl = "";
    if (req.files !== undefined) { ppurl = `${req.protocol}://${req.get('host')}/medias/${req.files[i].filename}`; }
    else { ppurl = null; }
    const user = await db.User.update({ 
        name: req.body.name,
        email: req.body.email,
        ppurl: ppurl,
        bio: req.body.bio }, 
        { where: { id: req.body.userId }});
    if (user === null) {
        return res.status(400).json({ err });
    }
    res.status(201).json({ message: "Votre profile a été modifié avec succés !" });
}

exports.getUser = async (req, res) => {
    const user = await db.User.findAll({
        where: { name: {
            [Op.like]: req.body.name + "%"
        }}
    });
    if (user === null) {
        return res.status(201).json({ message: "Aucun résultat" })
    }
    res.status(201).json({ user });
}

exports.deleteUser = async (req, res, next) => {
    const isAdmin = await db.User.findOne({ where: { id: req.body.userId }});
    const user = await db.User.findOne({ where: { email: req.body.email }});
    if (isAdmin.admin === true || bcrypt.compare(req.body.password, user.password)) {
        const posts = await db.Post.findAll({ where: {
            user_id: user.id
        }});
        for (let i = 0; i < posts.length; i++) {
            const media = await db.Media.findAll({ where: {
                post_id: posts[i].id
            }});
            for (let i = 0; i < media.length; i++) {
                const filename = media[i].dataValues.url.split('medias/')[1];
                fs.unlink(`medias/${filename}`, async () => {
                    await db.Media.destroy({ where: {
                        id: media[i].dataValues.id
                    }})
            })}
            await db.Reply.destroy({ where: { post_id: posts[i].id }});
            await db.Post.destroy({ where: { id: posts[i].id }});
        }
        const pp = user.ppurl.split('medias/')[1];
        fs.unlink(`medias/${pp}`, async ()=>{
            await db.User.destroy({ where: { email: req.body.email }});
        });
        return res.status(200).json({ message: 'Utilisateur supprimé !'});
    }
};