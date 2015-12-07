/**
 * 
 * @author jskonst
 * @public 
 * @module helloRest
 */
define(['orm'], function (Orm, ModuleName) {
    return function () {
        var self = this, model = Orm.loadModel(ModuleName);

        var customers = {ohio: 78, ivanovo: 67};

        /**
         * @get /customers
         * @returns {RESTTest.customers}
         */
        this.getCustomers = function (aCustomer) {
            P.Logger.info(aCustomer);
            if (aCustomer)
                return customers[aCustomer];
            else
                return customers;
        };

        /**
         * @post /customers
         * @returns {RESTTest.customers}
         */
        this.createCustomer = function (param) {
            P.Logger.info(param);
            var http = new P.HttpContext();
            var custNo = 'cust-' + P.ID.generate();
            customers[custNo] = JSON.parse(http.request.body);
            return custNo;
        };

        /**
         * @delete /customers
         * @returns {undefined}
         */
        this.deleteCustomer = function (aCustomer) {
            if (aCustomer) {
                var deleted = customers[aCustomer];
                delete customers[aCustomer];
            } else {
                customers = {};
            }
        };


    };
});




/* global P */

///**
// * 
// * @author mg
// * @public 
// * @constructor
// */
//function RESTTest() {
//    var self = this, model = P.loadModel(this.constructor.name);
//
//    var customers = {ohio: 78, ivanovo: 67};
//
//    /**
//     * @get /customers
//     * @returns {RESTTest.customers}
//     */
//    this.getCustomers = function (aCustomer) {
//        if (aCustomer)
//            return customers[aCustomer];
//        else
//            return customers;
//    };
//
//    
//
//    /**
//     * @delete /customers
//     * @returns {undefined}
//     */
//    this.deleteCustomer = function (aCustomer) {
//        if (aCustomer) {
//            var deleted = customers[aCustomer];
//            delete customers[aCustomer];
//        } else {
//            customers = {};
//        }
//    };
//}