/**
 * Created by vitaliydrugak on 10.02.15.
 */
;(function (){
    var setings = {
        document: document.currentScript.ownerDocument,
        myCardProto: Object.create(HTMLElement.prototype),
        url: 'https://api.github.com/users/'
    }


    var API = {
        getUser: function () {
            console.log('getUser 3');

            var that = this,
                xhr = new XMLHttpRequest();

            xhr.open('GET', setings.url + 'drugak');
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
        fillUser: function (user){
            console.log('fillUser 4');
            var usr = setings.myCardProto.shadow;
            console.log('fillUser 4.1', usr);
            usr.querySelector('#name').textContent = user.name;
            usr.querySelector('#avatar').src = user.avatar_url;
        }
    };


    var lifeСycle = {
        createdCallback: setings.myCardProto.createdCallback = function (){
            console.log('createdCallback 1');
            var template = setings.document.querySelector('#my-card'),
                usr = template.content.cloneNode(true);
            setings.myCardProto.shadow = this.createShadowRoot();
            console.log('createdCallback 1.1');
            setings.myCardProto.shadow.appendChild(usr);
            console.log('createdCallback 1.2');
        },
        attachedCallback: setings.myCardProto.attachedCallback = function () {
            console.log('attachedCallback 2');
            API.getUser();
        }
    }


    var Xgithub = document.registerElement('my-card', {'prototype': setings.myCardProto});
}());