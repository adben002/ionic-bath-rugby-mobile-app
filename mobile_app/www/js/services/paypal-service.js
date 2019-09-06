(function(MainService) {

    var clientIDs = {
        "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
        "PayPalEnvironmentSandbox": "AQuk6BDCjPbawRIIofzySFV6YW1sD5BVzBspFE6qB9fSqDycY8-ITl13Hwfb"
    };
    var basePayPalConfiguration = {
        merchantName: "My test shop",
        merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
        merchantUserAgreementURL: "https://mytestshop.com/agreement"
    };
    var currency = "GBP";

    MainService.module
        .factory('PayPalService', function() {
            return function(callback, price, title) {

                var config = new PayPalConfiguration(basePayPalConfiguration);
                var onPayPalMobileInit = function() {
                    PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", config, function() {
                        var buyFunc = function(price, title) {
                            var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
                            var payment = new PayPalPayment(price, currency, title, "Sale", paymentDetails);
                            PayPalMobile.renderSinglePaymentUI(payment);
                        }

                        callback(function() {
                            buyFunc(price, title);
                        });
                    });
                }
                PayPalMobile.init(clientIDs, onPayPalMobileInit);
            }
        });

})(MainService);
