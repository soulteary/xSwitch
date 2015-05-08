/**
 * 程序主文件
 */
define(function () {
    'use strict';

    var _xSwitch   = window.xSwitch,
        defaultKEY = 'debug',
        versionKEY = 'ver';


    /**
     * 获取HASH中的参数
     * @param params
     * @returns {*}
     */
    function analyseHash (params) {
        var query = location.hash.split('#')[1];
        if (query && (query.indexOf(params.debugKey || defaultKEY) > -1) && (query.indexOf(params.version || versionKEY) > -1)) {
            var arr = query.split('&');
            for (var i = 0, j = arr.length; i < j; i++) {
                var tmpKey = versionKEY + '=';
                if (arr[i].indexOf(tmpKey) > -1) {
                    query = arr[i].split(tmpKey)[1] || "";
                    break;
                }
            }
            return query;
        } else {
            return false;
        }
    };

    function process (params) {
        var query = analyseHash(params || {});
        var scripts = document.getElementsByTagName('script'),
            script  = null;

        for (var i = 0, j = scripts.length; i < j; i++) {
            script = scripts[i];
            if (script.getAttribute('data-switch')) {
                var replaceElem = document.createElement('script');
                replaceElem.src = script.getAttribute('src').replace(/.*(\-\d+\.\d+\.\d+)(\.min)?\.js/, function (full, match) {
                    return full.replace(match, '-' + (params.version || query));
                });
                script.parentNode.replaceChild(replaceElem, script);
            }
        }
    }

    var xSwitch = {
        init      : process,
        noConflict: function () {
            if (window.xSwitch === xSwitch) {
                window.xSwitch = _xSwitch;
            }
            return xSwitch;
        }
    }

    if (!window.xSwitch) {
        window.xSwitch = xSwitch;
    }

    process();

    return xSwitch;
});