/**
 * Created by vitaliydrugak on 10.02.15.
 */
;(function (){
    'use strict'

    var setings = {
        document: document.currentScript.ownerDocument,
        myCardProto: Object.create(HTMLElement.prototype),
        url: 'http://api.randomuser.me/',
        usr: undefined,
        refreshButton: undefined
    }


    var API = {

        getUser: function () {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', setings.url);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE) {
                    status = xhr.status;

                    if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                        var response = JSON.parse(xhr.response || xhr.responseText);
                        API.fillUser(response);
                    }
                }
            };
            xhr.send();

        },

        fillUser: function (randomUser){
            setings.usr = setings.myCardProto.shadow;

            var userNode = {
                    name: setings.usr.querySelector('#name'),
                    email: setings.usr.querySelector('#email'),
                    adress: setings.usr.querySelector('#adress'),
                    phone: setings.usr.querySelector('#phone'),
                    photo: setings.usr.querySelector('#photo')
                },

                userObj = randomUser.results[0].user;

            userNode.email.textContent = userObj.email;
            userNode.name.textContent = userObj.name.first;
            userNode.adress.textContent = userObj.location.state;
            userNode.phone.textContent = userObj.phone;
            userNode.photo.src = userObj.picture.medium;

            if (!setings.refreshButton) {
                init();
            }
        },

        refresh: function () {
            setings.refreshButton.addEventListener('click', function () {
                API.getUser();
            })
        }

    };


    var lifeСycle = {
        createdCallback: setings.myCardProto.createdCallback = function (){
            var template = setings.document.querySelector('#random-user'),
                usr = template.content.cloneNode(true);

            setings.myCardProto.shadow = this.createShadowRoot();
            setings.myCardProto.shadow.appendChild(usr);
        },
        attachedCallback: setings.myCardProto.attachedCallback = function () {
            API.getUser();
        }
    };

    function init () {
        setings.refreshButton = setings.usr.querySelector('#refresh');
        API.refresh();
    };


    document.registerElement('random-user', {'prototype': setings.myCardProto});
}());