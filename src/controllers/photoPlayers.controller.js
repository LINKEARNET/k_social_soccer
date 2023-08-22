const pool = require("../config/database");
const players = require("../models/player.model");
const { isLoggedIn } = require('../lib/auth');

const photoPlayer = {};

photoPlayer.updatePhoto = async (req, res) => {
    const { id } = req.params;
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0 ) {
        req.flash('message', 'No has ingresado una foto')
        return res.status(400).redirect('/players');
    }
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-player/' + sampleFile.name;

    console.log(sampleFile);

    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE players SET photo = ? WHERE id = ?', [sampleFile.name, id])
        req.flash('success', 'Foto agregada actualizado');
        res.redirect('/players');

    });

};
module.exports = photoPlayer