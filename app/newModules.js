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
            if (re.test(value)) {
                event.source.background = null;
                event.source.toolTipText = '';
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

        function isUserExist(userMail, aCallback) {
            var baseUrl = "http://" +
                    window.location.host +
                    window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"))
                    + "/application/";
            var request = new XMLHttpRequest();
            request.open("GET", // За­прос ти­па HTTP GET
                    (baseUrl + "customers/" + userMail), true);
            request.send();
            request.onreadystatechange = function () {
                if (request.readyState === request.DONE) {
                    if (request.status == 200) {
                        aCallback(request.responseText);
                    } else {
                        alert(request.statusText);
                    }
                }
            };
        }

        form.ffEmail.onValueChange = function (event) {
            if (form.ffEmail.value) {
                isUserExist(form.ffEmail.value, function (aResult) {
                    var result = JSON.parse(aResult);
                    if (result.userExist) {
                        event.source.background = P.Color.PINK;
                        event.source.toolTipText = "Пользователь с таким E-mail существует";
                    } else {
                        event.source.background = null;
                        event.source.toolTipText = '';
                    }
                });
            }
        };


        form.btnSubmit.onActionPerformed = function () {
            var baseUrl = "http://" +
                    window.location.host +
                    window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"))
                    + "/application/";
            var request = new XMLHttpRequest();
            if (form.ffEmail.value) {
                user.email = form.ffEmail.value;
                var body = JSON.stringify(user);
                request.open("POST", (baseUrl + "customers"), true);
                request.setRequestHeader('Content-Type', 'application/json');

                request.onreadystatechange = function () {
                    if (request.readyState === request.DONE) {
                        if (request.status == 200) {
                            var user = JSON.parse(request.responseText);
                            if (user.userExist){
                                form.ffEmail.background = P.Color.PINK;
                                form.ffEmail.toolTipText = "Пользователь с таким E-mail существует";
                                return;
                            }
                            if (user.created){
                                alert('Вы зарегистрированы');
                            }else{
                                alert('Проверьте введенные поля и повторите попытку');
                            }
                        } else {
                            alert(request.statusText);
                        }
                    }
                };
                request.send(body);
            }else{
                alert('Check e-mail');
            }
        };

    };
});
