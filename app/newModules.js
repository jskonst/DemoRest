/**
 * 
 * @author jskonst
 * @module newModules
 */
define(['orm', 'forms', 'ui'], function (Orm, Forms, Ui, ModuleName) {
    return function () {
        var self = this
                , model = Orm.loadModel(ModuleName)
                , form = Forms.loadForm(ModuleName, model);

        self.show = function () {
            form.show();
        };


        form.button.onActionPerformed = function () {
            var baseUrl = "http://" +
                    window.location.host +
                    window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"))
                    + "/application/";
            P.Logger.info(baseUrl);
            var request = new XMLHttpRequest();
            request.open("GET", // За­прос ти­па HTTP GET
                    (baseUrl + "customers"), true);
            request.send();
            request.onreadystatechange = function () {
                if (request.readyState === request.DONE) {
                    if (request.status == 200) {
                        P.Logger.info(request.responseText);
                        P.Logger.info(request.responseType);
                    } else {
                        alert(request.statusText);
                    }
                }
            };

//            require(['anotherModule'], function (Module2) {
//                var mod2 = new Module2();
//                mod2.show();
//            });
        };

        // TODO : place your code here

        model.requery(function () {
            // TODO : place your code here
        });

    };
});
