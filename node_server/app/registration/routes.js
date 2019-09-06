var Registration = require('./models/registration');

module.exports = function(app) {

    app.post('/register', function(req, res) {
        Registration.create({
            _id: req.body.id
        });
        res.send("");
        return;
    });

};
