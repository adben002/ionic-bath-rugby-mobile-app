(function(MainService) {

    var products = [{
        id: 1,
        title: "Bath Rugby 2014/15 Home Short Sleeve Shirt",
        price: "55.00",
        description: "Show your support this season with the official Bath Rugby Authentic Home Shirt. The blue, black and white hoops offer a traditional touch to this modern rugby shirt.",
        picture: "img/shop/09-009.jpg"
    }, {
        id: 2,
        title: "Bath Rugby Women Supporters Jersey",
        price: "55.00",
        description: "This traditionally styled blue, black and white rugby jersey is designed with all our proud Bath Rugby supporters in mind.",
        picture: "img/shop/supporters-jersey-ladies.jpg"
    }, {
        id: 3,
        title: "Bath Rugby Barcode Scarf",
        price: "12.95",
        description: "The popular blue, black and white stripped scarf makes a return this season.",
        picture: "img/shop/barcode_scarf.jpg"
    }, {
        id: 4,
        title: "Bath Rugby Carrick Scarf",
        price: "12.95",
        description: "This royal blue, black and white winter scarf comes in a varied pattern with a winter theme.",
        picture: "img/shop/scarf1.jpg"
    }, {
        id: 5,
        title: "Bath Rugby Children's Socks",
        price: "6.50",
        description: "Bath Rugby are pleased to present the everyday striped socks. Please note these socks are one size only and will fit shoe size 3-6. This product is machine washable.",
        picture: "img/shop/socks_2.jpg"
    }, {
        id: 6,
        title: "Boxed Tie and Cufflinks Gift Set",
        price: "23.95",
        description: "This polysilk tie has blue and black stripes with fine divides of white. The full colour Bath Rugby logo is embroidered on the bottom right of the tie and the sophisticated gift box also contains a set of blue, black and white cufflinks.",
        picture: "img/shop/boxedtieandcufflinks.jpg"
    }, {
        id: 7,
        title: "Bath Rugby Gloves",
        price: "7.50",
        description: "Bath Rugby are pleased to present the ever popular thinsulated gloves.",
        picture: "img/shop/gloves.jpg"
    }];

    MainService.module
        .factory('ShopService', function() {
            return {
                allProducts: function(callback) {
                    callback(products);
                },
                product: function(id, callback) {
                    for (var idx in products) {
                        var product = products[idx];
                        if (product.id === parseInt(id, 10)) {
                            callback(product);
                            return;
                        }
                    }
                }
            }
        });

})(MainService);
