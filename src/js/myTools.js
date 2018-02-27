'use strict';

(function(window, document) {
    function Jay(selector) {};
    Jay.prototype = {
        constructor: Jay,
        //获取元素
        $: function(selector) {
            if (selector[0] === '#') {
                return document.getElementById(selector.slice(1));
            } else {
                var node = document.querySelectorAll(selector);
                return node.length > 1 ? node : node[0];
            }
        },
        //函数防抖
        debounce: function(fn, delay, now) {
            var timer;
            return function() {
                var self = this;
                if (now) {
                    now = false;
                    fn.call(self);
                }
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.call(self);
                }, delay);
            }
        },
        //函数节流
        throttle: function(fn, delay, time) {
            var timer,
                oldTime = new Date(),
                now;
            return function() {
                var self = this;
                if ((now = new Date()) - oldTime > time) {
                    fn.call(self);
                    oldTime = now;
                }
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.call(self);
                }, delay);
            }
        },
        //判断类型
        nativeType: function(obj) {
            var type = typeof obj;
            if (type === 'object') {
                var objType = {}.toString.call(obj);
                return /\b(\w+)]/.exec(objType)[1].toLowerCase();
            }
            return type;
        },
        //获取url参数
        getParameter: function(url, key) {
            var paramate = {};
            if (url === true) {
                url = window.location.search;
            } else if (!/\?/.test(url)) {
                return;
            }
            if (this.nativeType(key) === 'array') {
                for (var i = key.length; i--;) {
                    new RegExp('(?:[?|&])' + key[i] + '=([^&]*)', 'ig').test(url) && (paramate[key[i]] = RegExp.$1);
                }
                return paramate;
            } else if (this.nativeType(key) === 'string') {
                new RegExp('(?:[?|&])' + key + '=([^&]*)', 'ig').test(url) && (paramate[key] = RegExp.$1);
                return paramate;
            } else {
                var reg = /(?:[?|&])(.+?)=([^&]*)/ig;
                while (reg.test(url)) {
                    paramate[RegExp.$1] = RegExp.$2;
                }
                return paramate;
            }

        },
        //ajax
        ajax: function(option) {
            if (option == undefined || this.nativeType(option.url) !== 'string') {
                return;
            }
            this.nativeType(option.success) !== 'function' && console.warn('missing succss function or success is no a function');
            var xhr = new XMLHttpRequest(),
                url = option.url,
                type = option.type || 'get',
                dataType = option.dataType || 'json',
                contentType = option.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                data,
                temp = [];
            type = type.toLowerCase();
            dataType = dataType.toLowerCase();
            if (option.data && this.nativeType(option.data) === 'string') {
                data = option.data;
            } else if (option.data && this.nativeType(option.data) === 'object') {
                for (var key in option.data) {
                    temp.push(key + '=' + option.data[key]);
                }
                data = temp.join('&');
            }
            (type === 'get' || type === 'jsonp') && data && (url += '?' + data);
            if (type === 'jsonp') {
                var callbackName = option.callbackName || 'callback',
                    script = document.createElement('script'),
                    random = ('' + Math.random() + Math.random()).replace(/0\./g, '_');
                script.src = url + '&' + callbackName + '=jayTools' + random;
                document.body.appendChild(script);
                window['jayTools' + random] = option.success;
                document.body.removeChild(script);
                return;
            }
            xhr.responseType = dataType;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        option.success.call(this, dataType === 'json' ? xhr.response : dataType === 'xml' ? xhr.responseXML : xhr.responseText);
                    } else {
                        option.error && option.error.call(this, xhr.status, xhr.statusText);
                    }
                }
            }
            xhr.open(type, url, true);
            type === 'get' ? xhr.send(null) : xhr.send(data), xhr.contentType = contentType;
        }
    }
    window.jay = new Jay();
})(window, document);