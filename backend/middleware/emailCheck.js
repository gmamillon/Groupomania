module.exports = (req, res, next) => {
    const regexEmail = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
    if (regexEmail.test(req.body.email)) {
        next();
    } else {
        res.status(400).json({ error: "Veuillez renseigner une adresse e-mail valide." });
    }
};