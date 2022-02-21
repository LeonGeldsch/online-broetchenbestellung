(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ScrollIndicator_1 = require("./application/ScrollIndicator");

var XHR_1 = require("./application/XHR");

(function () {
  'use strict';

  var scrollIndicator = new ScrollIndicator_1["default"]();
  var store = {};
  document.getElementById('login').addEventListener('click', function (event) {
    event.preventDefault();
    var url = 'http://localhost:8080/api/user/login';
    var formData = new FormData();
    formData.append('username', 'john');
    formData.append('password', 'aA1!1234');
    var xhr = new XHR_1["default"]();
    xhr.post(url, formData);
  });
  document.getElementById('logout').addEventListener('click', function (event) {
    event.preventDefault();
    var url = 'http://localhost:8080/api/user/logout';
    var xhr = new XHR_1["default"]();
    xhr.get(url);
  });
  document.getElementById('create_post').addEventListener('click', function (event) {
    event.preventDefault();
    var url = 'http://localhost:8080/api/posts/create';
    var formData = new FormData();
    formData.append('user_id', '1');
    formData.append('title', 'Post Title with enough Chars');
    formData.append('content', 'Post Content, for some reason i need to type some more letters...');
    var xhr = new XHR_1["default"]();
    xhr.post(url, formData);
  });
  document.getElementById('delete_post').addEventListener('click', function (event) {
    event.preventDefault();
    var url = 'http://localhost:8080/api/posts/delete/1';
    var xhr = new XHR_1["default"]();
    xhr["delete"](url);
  });
  document.getElementById('update_post').addEventListener('click', function (event) {
    event.preventDefault();
    var url = 'http://localhost:8080/api/posts/update/1';
    var formData = new FormData();
    formData.append('title', 'New Title with enough Chars');
    formData.append('content', 'New Content, for some reason i need to type some more letters...');
    var xhr = new XHR_1["default"]();
    xhr.update(url, formData);
  });
})();

},{"./application/ScrollIndicator":2,"./application/XHR":3}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ScrollIndicator = /*#__PURE__*/function () {
  function ScrollIndicator() {
    _classCallCheck(this, ScrollIndicator);

    window.addEventListener('scroll', this.eventListener);
  }

  _createClass(ScrollIndicator, [{
    key: "eventListener",
    value: function eventListener(event) {
      console.log(event);
    }
  }]);

  return ScrollIndicator;
}();

exports["default"] = ScrollIndicator;

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var XHR = /*#__PURE__*/function () {
  function XHR() {
    _classCallCheck(this, XHR);

    this.bindErrorEventHandler = this.bindErrorEventHandler.bind(this);
    this.bindSuccessEventHandler = this.bindSuccessEventHandler.bind(this);
    this.bindProgressEventHandler = this.bindProgressEventHandler.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.Request = new XMLHttpRequest();
    this.token = this.getToken();
    this.Request.onload = this.onLoad;
    this.Request.upload.addEventListener('progress', this.onProgress);
  }

  _createClass(XHR, [{
    key: "get",
    value: function get(url) {
      this.Request.open('GET', url);
      this.Request.setRequestHeader('AUTHORIZATION', this.token);
      this.Request.send();
    }
  }, {
    key: "post",
    value: function post(url, data) {
      this.Request.open('POST', url);
      this.Request.setRequestHeader('AUTHORIZATION', this.token);
      this.Request.send(data);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      this.Request.open('DELETE', url);
      this.Request.setRequestHeader('AUTHORIZATION', this.token);
      this.Request.send();
    }
  }, {
    key: "update",
    value: function update(url, data) {
      this.Request.open('PUT', url);
      this.Request.setRequestHeader('AUTHORIZATION', this.token);
      this.Request.send(data);
    }
  }, {
    key: "bindErrorEventHandler",
    value: function bindErrorEventHandler(callback) {
      this.errorEventHandler = callback;
    }
  }, {
    key: "bindSuccessEventHandler",
    value: function bindSuccessEventHandler(callback) {
      this.successEventHandler = callback;
    }
  }, {
    key: "bindProgressEventHandler",
    value: function bindProgressEventHandler(callback) {
      this.progressEventHandler = callback;
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      switch (this.Request.status) {
        case 200:
          if (this.successEventHandler) {
            this.successEventHandler(this.Request);
            console.log(this.Request.responseText);
          }

          break;

        case 400:
          if (this.errorEventHandler) {
            this.errorEventHandler(this.Request);
            console.log(this.Request.responseText);
          }

          break;
      }

      this.updateToken(JSON.parse(this.Request.responseText));
    }
  }, {
    key: "onProgress",
    value: function onProgress(event) {
      if (this.progressEventHandler) {
        this.progressEventHandler(event);
      }
    }
  }, {
    key: "deleteToken",
    value: function deleteToken() {
      this.delete_cookie('JWT', '/', 'http://localhost:8080');
    }
  }, {
    key: "getToken",
    value: function getToken() {
      // @ts-ignore
      var cookies = document.cookie.split('; ').find(function (row) {
        return row.startsWith('JWT=');
      });
      return cookies !== undefined ? cookies.split('=')[1] : null;
    }
  }, {
    key: "updateToken",
    value: function updateToken(response) {
      var jwt = response['jwt'];

      if (jwt !== undefined) {
        var date = new Date();
        date.setTime(date.getTime() + 5 * 60 * 1000); // @ts-ignore

        var expires = "expires=" + date.toGMTString();
        console.log(expires);
        document.cookie = 'JWT' + '=AUTHORIZE ' + jwt + ';path:/;domain:http://localhost:8080;' + expires;
      }
    }
  }, {
    key: "delete_cookie",
    value: function delete_cookie(name, path, domain) {
      if (this.get_cookie(name)) {
        document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      }
    }
  }, {
    key: "get_cookie",
    value: function get_cookie(name) {
      return document.cookie.split(';').some(function (c) {
        // @ts-ignore
        return c.trim().startsWith(name + '=');
      });
    }
  }]);

  return XHR;
}();

exports["default"] = XHR;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL3RzL2FwcGxpY2F0aW9uLnRzIiwiYXNzZXRzL3NyYy90cy9hcHBsaWNhdGlvbi9TY3JvbGxJbmRpY2F0b3IudHMiLCJhc3NldHMvc3JjL3RzL2FwcGxpY2F0aW9uL1hIUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLElBQUEsaUJBQUEsR0FBQSxPQUFBLENBQUEsK0JBQUEsQ0FBQTs7QUFDQSxJQUFBLEtBQUEsR0FBQSxPQUFBLENBQUEsbUJBQUEsQ0FBQTs7QUFFQSxDQUFDLFlBQUE7QUFFRzs7QUFFQSxNQUFNLGVBQWUsR0FBRyxJQUFJLGlCQUFBLFdBQUosRUFBeEI7QUFFQSxNQUFJLEtBQUssR0FBRyxFQUFaO0FBRUEsRUFBQSxRQUFRLENBQUMsY0FBVCxDQUF5QixPQUF6QixFQUFtQyxnQkFBbkMsQ0FBcUQsT0FBckQsRUFBOEQsVUFBVSxLQUFWLEVBQWU7QUFDekUsSUFBQSxLQUFLLENBQUMsY0FBTjtBQUVBLFFBQU0sR0FBRyxHQUFHLHNDQUFaO0FBRUEsUUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFKLEVBQWY7QUFDQSxJQUFBLFFBQVEsQ0FBQyxNQUFULENBQWlCLFVBQWpCLEVBQTZCLE1BQTdCO0FBQ0EsSUFBQSxRQUFRLENBQUMsTUFBVCxDQUFpQixVQUFqQixFQUE2QixVQUE3QjtBQUVBLFFBQUksR0FBRyxHQUFHLElBQUksS0FBQSxXQUFKLEVBQVY7QUFDQSxJQUFBLEdBQUcsQ0FBQyxJQUFKLENBQVUsR0FBVixFQUFlLFFBQWY7QUFDSCxHQVhEO0FBWUEsRUFBQSxRQUFRLENBQUMsY0FBVCxDQUF5QixRQUF6QixFQUFvQyxnQkFBcEMsQ0FBc0QsT0FBdEQsRUFBK0QsVUFBVSxLQUFWLEVBQWU7QUFDMUUsSUFBQSxLQUFLLENBQUMsY0FBTjtBQUVBLFFBQU0sR0FBRyxHQUFHLHVDQUFaO0FBRUEsUUFBSSxHQUFHLEdB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QUksSUFBSixFQUFYO0FBQ0EsUUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUksQ0FBQyxPQUFMLEtBQWdCLElBQUUsRUFBRixHQUFLLElBQWxDLEVBRnFCLENBR3JCOztBQUNBLFlBQU0sT0FBTyxHQUFHLGFBQVcsSUFBSSxDQUFDLFdBQUwsRUFBM0I7QUFFQSxRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQWEsT0FBYjtBQUVBLFFBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0IsUUFBUSxhQUFSLEdBQXdCLEdBQXhCLEdBQThCLHVDQUE5QixHQUF3RSxPQUExRjtBQUNIO0FBQ0o7OztXQUVELHVCQUFlLElBQWYsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0IsRUFBaUM7QUFDN0IsVUFBSSxLQUFLLFVBQUwsQ0FBaUIsSUFBakIsQ0FBSixFQUE4QjtBQUMxQixRQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLElBQUksR0FBRyxHQUFQLElBQ1osSUFBRCxHQUFTLFdBQVMsSUFBbEIsR0FBdUIsRUFEVixLQUVaLE1BQUQsR0FBUyxhQUFXLE1BQXBCLEdBQTJCLEVBRmQsSUFHZCx3Q0FISjtBQUlIO0FBQ0o7OztXQUVELG9CQUFXLElBQVgsRUFBZTtBQUNYLGFBQU8sUUFBUSxDQUFDLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkIsSUFBM0IsQ0FBZ0MsVUFBQSxDQUFDLEVBQUc7QUFDdkM7QUFDQSxlQUFPLENBQUMsQ0FBQyxJQUFGLEdBQVMsVUFBVCxDQUFvQixJQUFJLEdBQUcsR0FBM0IsQ0FBUDtBQUNILE9BSE0sQ0FBUDtBQUlIOzs7Ozs7QUFoSUwsT0FBQSxXQUFBLEdBQUEsR0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBTY3JvbGxJbmRpY2F0b3IgZnJvbSBcIi4vYXBwbGljYXRpb24vU2Nyb2xsSW5kaWNhdG9yXCI7XG5pbXBvcnQgWEhSIGZyb20gXCIuL2FwcGxpY2F0aW9uL1hIUlwiO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBjb25zdCBzY3JvbGxJbmRpY2F0b3IgPSBuZXcgU2Nyb2xsSW5kaWNhdG9yKCk7XG5cbiAgICBsZXQgc3RvcmUgPSB7fTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnbG9naW4nICkuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3VzZXIvbG9naW4nO1xuXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoICd1c2VybmFtZScsICdqb2huJyApO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoICdwYXNzd29yZCcsICdhQTEhMTIzNCcgKTtcblxuICAgICAgICBsZXQgeGhyID0gbmV3IFhIUigpO1xuICAgICAgICB4aHIucG9zdCggdXJsLCBmb3JtRGF0YSApO1xuICAgIH0gKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2xvZ291dCcgKS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvdXNlci9sb2dvdXQnO1xuXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWEhSKCk7XG4gICAgICAgIHhoci5nZXQoIHVybCApO1xuICAgIH0gKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NyZWF0ZV9wb3N0JyApLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9wb3N0cy9jcmVhdGUnO1xuXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoICd1c2VyX2lkJywgJzEnICk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCggJ3RpdGxlJywgJ1Bvc3QgVGl0bGUgd2l0aCBlbm91Z2ggQ2hhcnMnICk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCggJ2NvbnRlbnQnLCAnUG9zdCBDb250ZW50LCBmb3Igc29tZSByZWFzb24gaSBuZWVkIHRvIHR5cGUgc29tZSBtb3JlIGxldHRlcnMuLi4nICk7XG5cbiAgICAgICAgbGV0IHhociA9IG5ldyBYSFIoKTtcbiAgICAgICAgeGhyLnBvc3QoIHVybCwgZm9ybURhdGEgKTtcbiAgICB9ICk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RlbGV0ZV9wb3N0JyApLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9wb3N0cy9kZWxldGUvMSc7XG5cbiAgICAgICAgbGV0IHhociA9IG5ldyBYSFIoKTtcbiAgICAgICAgeGhyLmRlbGV0ZSggdXJsICk7XG4gICAgfSApO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICd1cGRhdGVfcG9zdCcgKS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvcG9zdHMvdXBkYXRlLzEnO1xuXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoICd0aXRsZScsICdOZXcgVGl0bGUgd2l0aCBlbm91Z2ggQ2hhcnMnICk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCggJ2NvbnRlbnQnLCAnTmV3IENvbnRlbnQsIGZvciBzb21lIHJlYXNvbiBpIG5lZWQgdG8gdHlwZSBzb21lIG1vcmUgbGV0dGVycy4uLicgKTtcblxuICAgICAgICBsZXQgeGhyID0gbmV3IFhIUigpO1xuICAgICAgICB4aHIudXBkYXRlKCB1cmwsIGZvcm1EYXRhICk7XG4gICAgfSApO1xuXG59KSgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbEluZGljYXRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzLmV2ZW50TGlzdGVuZXIgKTtcbiAgICB9XG5cbiAgICBldmVudExpc3RlbmVyKCBldmVudCA6IEV2ZW50ICkgOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coIGV2ZW50ICk7XG4gICAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBYSFIge1xuXG4gICAgdG9rZW4gOiBhbnlcblxuICAgIFJlcXVlc3QgOiBYTUxIdHRwUmVxdWVzdFxuXG4gICAgc3VjY2Vzc0V2ZW50SGFuZGxlciA6IENhbGxhYmxlRnVuY3Rpb247XG5cbiAgICBlcnJvckV2ZW50SGFuZGxlciA6IENhbGxhYmxlRnVuY3Rpb247XG5cbiAgICBwcm9ncmVzc0V2ZW50SGFuZGxlciA6IENhbGxhYmxlRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5iaW5kRXJyb3JFdmVudEhhbmRsZXIgPSB0aGlzLmJpbmRFcnJvckV2ZW50SGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICAgIHRoaXMuYmluZFN1Y2Nlc3NFdmVudEhhbmRsZXIgPSB0aGlzLmJpbmRTdWNjZXNzRXZlbnRIYW5kbGVyLmJpbmQoIHRoaXMgKTtcbiAgICAgICAgdGhpcy5iaW5kUHJvZ3Jlc3NFdmVudEhhbmRsZXIgPSB0aGlzLmJpbmRQcm9ncmVzc0V2ZW50SGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICAgIHRoaXMub25Mb2FkID0gdGhpcy5vbkxvYWQuYmluZCggdGhpcyApO1xuICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MgPSB0aGlzLm9uUHJvZ3Jlc3MuYmluZCggdGhpcyApO1xuXG4gICAgICAgIHRoaXMuUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xuXG4gICAgICAgIHRoaXMuUmVxdWVzdC5vbmxvYWQgPSB0aGlzLm9uTG9hZDtcbiAgICAgICAgdGhpcy5SZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCAncHJvZ3Jlc3MnLCB0aGlzLm9uUHJvZ3Jlc3MgKTtcbiAgICB9XG5cbiAgICBnZXQoIHVybDogc3RyaW5nICkge1xuICAgICAgICB0aGlzLlJlcXVlc3Qub3BlbiggJ0dFVCcsIHVybCApO1xuICAgICAgICB0aGlzLlJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlciggJ0FVVEhPUklaQVRJT04nLCB0aGlzLnRva2VuICk7XG4gICAgICAgIHRoaXMuUmVxdWVzdC5zZW5kKCk7XG4gICAgfVxuXG4gICAgcG9zdCggdXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhICkge1xuICAgICAgICB0aGlzLlJlcXVlc3Qub3BlbiggJ1BPU1QnLCB1cmwgKTtcbiAgICAgICAgdGhpcy5SZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoICdBVVRIT1JJWkFUSU9OJywgdGhpcy50b2tlbiApO1xuICAgICAgICB0aGlzLlJlcXVlc3Quc2VuZCggZGF0YSApO1xuICAgIH1cblxuICAgIGRlbGV0ZSggdXJsOiBzdHJpbmcgKSB7XG4gICAgICAgIHRoaXMuUmVxdWVzdC5vcGVuKCAnREVMRVRFJywgdXJsICk7XG4gICAgICAgIHRoaXMuUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCAnQVVUSE9SSVpBVElPTicsIHRoaXMudG9rZW4gKTtcbiAgICAgICAgdGhpcy5SZXF1ZXN0LnNlbmQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoIHVybDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YSApIHtcbiAgICAgICAgdGhpcy5SZXF1ZXN0Lm9wZW4oICdQVVQnLCB1cmwgKTtcbiAgICAgICAgdGhpcy5SZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoICdBVVRIT1JJWkFUSU9OJywgdGhpcy50b2tlbiApO1xuICAgICAgICB0aGlzLlJlcXVlc3Quc2VuZCggZGF0YSApO1xuICAgIH1cblxuICAgIGJpbmRFcnJvckV2ZW50SGFuZGxlciggY2FsbGJhY2sgOiBDYWxsYWJsZUZ1bmN0aW9uICkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lcnJvckV2ZW50SGFuZGxlciA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGJpbmRTdWNjZXNzRXZlbnRIYW5kbGVyKCBjYWxsYmFjayA6IENhbGxhYmxlRnVuY3Rpb24gKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Y2Nlc3NFdmVudEhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBiaW5kUHJvZ3Jlc3NFdmVudEhhbmRsZXIoIGNhbGxiYWNrIDogQ2FsbGFibGVGdW5jdGlvbiApIDogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NFdmVudEhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBvbkxvYWQoKSA6IHZvaWQge1xuICAgICAgICBzd2l0Y2goIHRoaXMuUmVxdWVzdC5zdGF0dXMgKSB7XG4gICAgICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuc3VjY2Vzc0V2ZW50SGFuZGxlciApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzRXZlbnRIYW5kbGVyKCB0aGlzLlJlcXVlc3QgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHRoaXMuUmVxdWVzdC5yZXNwb25zZVRleHQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuZXJyb3JFdmVudEhhbmRsZXIgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JFdmVudEhhbmRsZXIoIHRoaXMuUmVxdWVzdCApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggdGhpcy5SZXF1ZXN0LnJlc3BvbnNlVGV4dCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVG9rZW4oIEpTT04ucGFyc2UoIHRoaXMuUmVxdWVzdC5yZXNwb25zZVRleHQgKSApO1xuICAgIH1cblxuICAgIG9uUHJvZ3Jlc3MoIGV2ZW50IDogRXZlbnQgKSA6IHZvaWQge1xuICAgICAgICBpZiAoIHRoaXMucHJvZ3Jlc3NFdmVudEhhbmRsZXIgKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzRXZlbnRIYW5kbGVyKCBldmVudCApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlVG9rZW4oKSA6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZGVsZXRlX2Nvb2tpZSggJ0pXVCcsICcvJywgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcgKTtcbiAgICB9XG5cbiAgICBnZXRUb2tlbigpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpLmZpbmQocm93ID0+IHJvdy5zdGFydHNXaXRoKCdKV1Q9JykpO1xuXG4gICAgICAgIHJldHVybiBjb29raWVzICE9PSB1bmRlZmluZWQgPyBjb29raWVzLnNwbGl0KCc9JylbMV0gOiBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZVRva2VuKCByZXNwb25zZSApIDogdm9pZCB7XG4gICAgICAgIGNvbnN0IGp3dCA9IHJlc3BvbnNlWyAnand0JyBdO1xuXG4gICAgICAgIGlmICggand0ICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkrKDUqNjAqMTAwMCkpO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgY29uc3QgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIitkYXRlLnRvR01UU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBleHBpcmVzICk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdKV1QnICsgJz1BVVRIT1JJWkUgJyArIGp3dCArICc7cGF0aDovO2RvbWFpbjpodHRwOi8vbG9jYWxob3N0OjgwODA7JyArIGV4cGlyZXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVfY29va2llKCBuYW1lLCBwYXRoLCBkb21haW4gKSB7XG4gICAgICAgIGlmKCB0aGlzLmdldF9jb29raWUoIG5hbWUgKSApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArXG4gICAgICAgICAgICAgICAgKChwYXRoKSA/IFwiO3BhdGg9XCIrcGF0aDpcIlwiKStcbiAgICAgICAgICAgICAgICAoKGRvbWFpbik/XCI7ZG9tYWluPVwiK2RvbWFpbjpcIlwiKSArXG4gICAgICAgICAgICAgICAgXCI7ZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAxIEdNVFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0X2Nvb2tpZShuYW1lKXtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLnNvbWUoYyA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXR1cm4gYy50cmltKCkuc3RhcnRzV2l0aChuYW1lICsgJz0nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
