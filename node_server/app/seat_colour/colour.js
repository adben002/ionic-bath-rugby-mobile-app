var lwip = require('lwip');
var PNG = require('png-js');

var width = 100;
var height = 50;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

exports.seat = function(req, httpRes, next) {
    var x = parseInt(req.params.x, 10);
    var y = parseInt(req.params.y, 10);
    lwip.open('img/baseImage.png', function(err, image) {
        var heightRatio = height / image.height();
        var possibleWidth = heightRatio * image.width();
        var resizeWidth = possibleWidth;
        if (possibleWidth > width) {
            resizeWidth = width;
        }
        image.resize(resizeWidth, function(err, image) {
            var widthDifference = (width - image.width());
            var padWidth = Math.floor(widthDifference / 2);
            var heightDifference = (height - image.height());
            var padHeight = Math.floor(heightDifference / 2);

            var left = padWidth + (widthDifference % 2);
            var right = padWidth;
            var topPad = padHeight + (heightDifference % 2);
            var bottom = padHeight;
            image.pad(left, topPad, right, bottom, 'white', function(err, image) {
                image.toBuffer('png', function(err, buffer) {
                    var myimage = new PNG(buffer);
                    myimage.decode(function(pixels) {
                        var idx = ((width * y) + x) * 4;
                        var colourValue = {
                            r: pixels[idx],
                            g: pixels[idx + 1],
                            b: pixels[idx + 2]
                        };
                        colourValue.hex = rgbToHex(colourValue.r, colourValue.g, colourValue.b);
                        httpRes.send(colourValue);
                    });
                });
            });
        });
    });
}
