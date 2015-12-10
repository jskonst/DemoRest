/**
 * 
 * @author jskonst
 * @public 
 * @module helloRest
 * @stateless
 */
define(['orm'], function (Orm, ModuleName) {
    return function () {
        var self = this, model = Orm.loadModel(ModuleName);

        /**
         * @get /customers
         * @returns {RESTTest.customers}
         */
        this.getCustomers = function (aUser, aOnSuccess) {
            model.qUserByEMail.params.email = aUser;
            model.requery(function () {
                var user = {"userExist":false};
                if (model.qUserByEMail.length>0){
                    user.userExist = true;
                }
                    aOnSuccess(user);
            });
        };

        /**
         * @post /customers
         * @returns {RESTTest.customers}
         */
        this.createCustomer = function (param,aOnSuccess) {
            var http = new P.HttpContext();
            var user = JSON.parse(http.request.body);
            
            model.qUserByEMail.params.email = user.email;
            model.requery(function () {
                user.userExist =false;
                if (model.qUserByEMail.length>0){
                    user.userExist = true;
                    aOnSuccess(user);
                }else{
                    model.qUsers.push(user);
                    model.save(function(){
                        user.created = true;
                        aOnSuccess(user);
                    }, function(){
                        user.created = false;
                        aOnSuccess(user);
                    });
                }
            });
            
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