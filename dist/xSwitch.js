;(function (root, factory) {
    if (typeof define === 'function') {
        define(['xSwitch'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        factory();
    }
}(this, function () {
    'use strict';
//WRAPPER
var xSwitch;
xSwitch = function () {
  var _xSwitch = window.xSwitch, defaultKEY = 'debug', versionKEY = 'ver';
  function analyseHash(params) {
    var query = location.hash.split('#')[1];
    if (query && query.indexOf(params.debugKey || defaultKEY) > -1 && query.indexOf(params.version || versionKEY) > -1) {
      var arr = query.split('&');
      for (var i = 0, j = arr.length; i < j; i++) {
        var tmpKey = versionKEY + '=';
        if (arr[i].indexOf(tmpKey) > -1) {
          query = arr[i].split(tmpKey)[1] || '';
          break;
        }
      }
      return query;
    } else {
      return false;
    }
  }
  function process(params) {
    var query = analyseHash(params || {});
    var scripts = document.getElementsByTagName('script'), script = null;
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
    init: process,
    noConflict: function () {
      if (window.xSwitch === xSwitch) {
        window.xSwitch = _xSwitch;
      }
      return xSwitch;
    }
  };
  if (!window.xSwitch) {
    window.xSwitch = xSwitch;
  }
  process();
  return xSwitch;
}();

//WRAPPER
    return xSwitch;
}));