var Colour = require('./colour');

module.exports = function(app) {
   app.get('/seatColour/:x/:y', Colour.seat);
};
