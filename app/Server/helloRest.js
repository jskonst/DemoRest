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
        this.getCustomers = function (aUser, aOnSuccess) {
//            if (aUser){
            model.qUserByEMail.params.email = aUser;
            model.requery(function () {
                P.Logger.info(model.qUserByEMail);
                var user = {"userExist":false};
                if (model.qUserByEMail.length>0){
                    user.userExist = true;
                }
                    aOnSuccess(user);
            });
//            }
        };

        /**
         * @post /customers
         * @returns {RESTTest.customers}
         */
        this.createCustomer = function (param) {
            P.Logger.info(param);
            var http = new P.HttpContext();
            var custNo = 'cust-' + P.ID.generate();
//            customers[custNo] = JSON.parse(http.request.body);
            var user = JSON.parse(http.request.body);
            P.Logger.info(user);
            P.Logger.info(user.email);
            return custNo;
        };

//        /**
//         * @delete /customers
//         * @returns {undefined}
//         */
//        this.deleteCustomer = function (aCustomer) {
//            if (aCustomer) {
//                var deleted = customers[aCustomer];
//                delete customers[aCustomer];
//            } else {
//                customers = {};
//            }
//        };


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