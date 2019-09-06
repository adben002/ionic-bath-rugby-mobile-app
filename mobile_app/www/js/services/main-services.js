/**
 * Created by Sandeep on 31/08/14.
 */
var MainService = (function(out, app) {
    out.httpUrl = "http://ramyst.com/";
    out.module = angular.module(app.servicesPath, []);


    return out;
})({}, app);
