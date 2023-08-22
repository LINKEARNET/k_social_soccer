const pool = require("../config/database");
const users = require("../models/user.model");
const { isLoggedIn } = require('../lib/auth');
const Profile = {};



Profile.getProfile =  (req, res) => {
    res.render('Pages/user-profile/user-profile')
};
Profile.editProfile =  (req, res) => {
    // console.log(req.body);

    res.render('Pages/user-profile/edit-profile');
};



Profile.postImageProfile =  async (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'No Ingresaste una Foto o Imagen')
        return res.status(400).redirect('/profile');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-profile/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE users SET profile_image = ? WHERE id = ?', [sampleFile.name, req.user.id])
        req.flash('success', 'Foto de perfil actualizado');
        res.redirect('/users/profile');

    });
};


Profile.updateImageProfile =  async (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('message', 'No Ingresaste una Foto o Imagen')
        return res.status(400).redirect('/profile');
    }

    // name of the input is sampleFile
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/../public/images/img-profile/' + sampleFile.name;

    console.log(sampleFile);

    // Use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
        pool.query('UPDATE users SET profile_image = ? WHERE id = ?', [sampleFile.name, req.user.id])
        req.flash('success', 'Foto de perfil actualizado');
        res.redirect('/profile');

    });
};


Profile.updateImageProfile = async (req, res) => {
    const { name, email, description } = req.body;
    const newUser = {
        name,
        description
    };

    // Use mv() to place file on the server

    await pool.query('UPDATE users set ? WHERE id = ?', [newUser, req.user.id]);
    req.flash('success', 'Usuario actualizado correctamente');
    req.flash('success', 'Información de perfil actualizado');

    res.redirect('/profile');



};

module.exports = Profile;
