const db = require('../models');
const fs = require('fs');

exports.newPost = async (req, res) => {
    try {
        const post = await db.Post.create({
            content: req.body.content,
            user_id: req.body.userId,
            media: req.body.media
        });
        if (req.files !== undefined) {
            var medialist = [];
            for (let i = 0; i < req.files.length; i++) {
                const media = await db.Media.create({
                    url: `${req.protocol}://${req.get('host')}/medias/${req.files[i].filename}`,
                    post_id: post.id
                })
                medialist.push(media.dataValues);
            }
            res.status(201).json({ post, medialist });
        } else { res.status(201).json({ post }); }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.getPosts = async (req, res) => {
    try {
        const latestPost = await db.Post.findAll({ limit: 20, order: [[ "createdAt", "DESC" ]]});
        res.status(200).json({latestPost});
    } catch (error) {
        console.log(error)
        res.status(401).json({ error })
    }
}

exports.getPostsFrom = async (req, res) => {
    try {
        const latestPostFrom = await db.Post.findAll({ limit: 20, order: [[ "createdAt", "DESC" ]],
        where: { user_id: req.params.id } });
        res.status(200).json({latestPostFrom});
    } catch (error) {
        res.status(401).json({ error })
    }
}

exports.getReplies = async (req, res) => {
    try {
        const replies = await db.Reply.findAll({ order: [[ "createdAt", "DESC"]], where: {
            post_id: req.params.id
        }});
        res.status(200).json({replies});
    } catch (error) {
        res.status(401).json({ error });
    }
}

exports.reply = async (req, res) => {
    try {
        const reply = await db.Reply.create({
            content: req.body.content,
            user_id: req.body.userId,
            post_id: req.body.postId,
        });
        res.status(201).json({ reply });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.deleteReply = async (req, res) => {
    const reply = await db.Reply.findOne({ where: { id: req.params.id }})
    const isAdmin = await db.User.findOne({ where: {id: req.body.userId}})
    if (reply.user_id === req.body.userId || isAdmin.admin) try {
        await db.Reply.destroy({ where: { id: reply.id }});
        res.status(200).json({ message: "Réponse supprimée !"})
    } catch (error) {
        res.status(401).json({ error: "Aucune réponse ne correspond à cet identifiant."})
    }
}

exports.deletePost = async (req, res) => {
    const post = await db.Post.findOne({ where: { id: req.params.id }})
    const isAdmin = await db.User.findOne({ where: { id: req.body.userId }})
    if (post.user_id === req.body.userId || isAdmin.admin) try {
            const media = await db.Media.findAll({ where: {
                post_id: post.id
            }});
            for (let i = 0; i < media.length; i++) {
                const filename = media[i].dataValues.url.split('medias/')[1];
                fs.unlink(`medias/${filename}`, async () => {
                    await db.Media.destroy({ where: {
                        id: media[i].dataValues.id
                    }})
                })}
            await db.Reply.destroy({ where: { post_id: post.id }});
            await db.Post.destroy({ where: { id: post.id }});
    res.status(200).json({ message: "Post supprimé !"})
    } catch (error) {
        res.status(401).json({ error: "Aucun post ne correspond à cet identifiant."})
    }
}