/**
 * 
 * @author jskonst
 * @module newModules
 */
define(['forms', 'ui'], function (Forms, Ui, ModuleName) {
    return function () {
        var self = this
                , form = Forms.loadForm(ModuleName);

        self.show = function () {
            form.show();
        };

        function onParseEmail(event) {
            var value = event.source.text;
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//            value = value.replace(/\s/gi, '');
//            value = value.split(',');
            if (re.test(value)) {
                event.source.background = null;

                return value;
            } else {
                event.source.background = P.Color.PINK;
                event.source.toolTipText = "Введите корректный E-mail адрес";
                return null;
            }
        }
        

        function onFormatEmail(event) {
            return event.source.value !== null ? event.source.value : event.source.text;
        }

        form.ffEmail.format = '';
        form.ffEmail.onParse = onParseEmail;
        form.ffEmail.onFormat = onFormatEmail;

        var user = {
            'email': ''
        };

        function isUserExist(userMail) {
            var baseUrl = "http://" +
                    window.location.host +
                    window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"))
                    + "/application/";
            P.Logger.info(baseUrl);
            var request = new XMLHttpRequest();
            request.open("GET", // За­прос ти­па HTTP GET
                    (baseUrl + "customers/" + userMail), true);
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
        }
        


        form.button.onActionPerformed = function () {
            isUserExist('ohio');
        };


        form.ffEmail.onValueChange = function (event) {
            P.Logger.info(form.ffEmail.value);
        };


        form.btnSubmit.onActionPerformed = function () {
            var baseUrl = "http://" +
                    window.location.host +
                    window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"))
                    + "/application/";
            var request = new XMLHttpRequest();
            user.email = form.ffEmail.value;
            var body = JSON.stringify(user);

            request.open("POST", (baseUrl + "customers"), true);
            request.setRequestHeader('Content-Type', 'application/json');

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
            request.send(body);
        };

    };
});
