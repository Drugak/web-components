/**
 * Created by vitaliydrugak on 10.02.15.
 */
;(function (){
    var setings = {
        document: document.currentScript.ownerDocument,
        myCardProto: Object.create(HTMLElement.prototype),
        url: 'http://api.randomuser.me/'
    }


    var API = {
        getUser: function () {
            var that = this,
                xhr = new XMLHttpRequest();

            xhr.open('GET', setings.url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.DONE) {
                    status = xhr.status;

                    if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                        response = JSON.parse(xhr.response || xhr.responseText);
                        that.fillUser(response);
                    }
                }
            };
            xhr.send();
        },
        fillUser: function (randomUser){
            var usr = setings.myCardProto.shadow,
                userNode = {
                    name: usr.querySelector('#name'),
                    email: usr.querySelector('#email'),
                    adress: usr.querySelector('#adress'),
                    phone: usr.querySelector('#phone'),
                    photo: usr.querySelector('#photo')
                },
                userObj = randomUser.results[0].user;

            userNode.email.textContent = userObj.email;
            userNode.name.textContent = userObj.name.first;
            userNode.adress.textContent = userObj.location.state;
            userNode.phone.textContent = userObj.phone;
            userNode.photo.src = userObj.picture.medium;
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
    }


    var Xgithub = document.registerElement('random-user', {'prototype': setings.myCardProto});
}());