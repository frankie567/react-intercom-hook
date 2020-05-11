"use strict";
/* eslint-disable @typescript-eslint/camelcase */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var IntercomAlignment;
(function (IntercomAlignment) {
    IntercomAlignment["Left"] = "left";
    IntercomAlignment["Right"] = "right";
})(IntercomAlignment = exports.IntercomAlignment || (exports.IntercomAlignment = {}));
function injectIntercomScript(app_id) {
    var w = window;
    var ic = w.Intercom;
    var is = w.intercomSettings;
    if (typeof ic === "function") {
        ic("reattach_activator");
        if (app_id === is.app_id)
            ic("update", is);
        else {
            ic("shutdown");
            ic("boot", __assign(__assign({}, is), { app_id: app_id }));
        }
    }
    else {
        var d_1 = document;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var i_1 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            i_1.c(args);
        };
        i_1.q = [];
        i_1.c = function (args) {
            i_1.q.push(args);
        };
        w.Intercom = i_1;
        var l = function () {
            var _a;
            var s = d_1.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.intercom.io/widget/" + app_id;
            var x = d_1.getElementsByTagName("script")[0];
            if ((_a = x) === null || _a === void 0 ? void 0 : _a.parentNode)
                x.parentNode.insertBefore(s, x);
            else
                d_1.getElementsByTagName("head")[0].append(s);
        };
        if (document.readyState === "complete")
            l();
        else if (w.attachEvent)
            w.attachEvent("onload", l);
        else
            w.addEventListener("load", l, false);
    }
}
// It helps us keep the library isomorphic, i.e. prevent errors when used in a SSR environment
var _isNotBrowser = typeof window === "undefined" || typeof document === "undefined";
var notBrowserSettings = { app_id: "APP_ID" };
var Intercom = /** @class */ (function () {
    function Intercom(settings) {
        if (typeof settings !== "object") {
            throw new TypeError("Constructor called with invalid settings type " + typeof settings + ", expected IntercomSettings");
        }
        this.settings = settings;
        if (this.settings.app_id)
            this.boot();
    }
    Intercom.getInstance = function (settings) {
        var _a, _b;
        if (_isNotBrowser) {
            Intercom.instance = new Intercom(notBrowserSettings);
            return Intercom.instance;
        }
        if (!settings)
            settings = window.intercomSettings;
        if (!Intercom.instance ||
            (!!((_a = settings) === null || _a === void 0 ? void 0 : _a.app_id) && Intercom.instance.appId !== settings.app_id)) {
            if ((_b = Intercom.instance) === null || _b === void 0 ? void 0 : _b.appId)
                Intercom.instance.command("shutdown");
            Intercom.instance = new Intercom(settings);
        }
        return Intercom.instance;
    };
    Intercom.prototype.init = function () {
        if (_isNotBrowser)
            return;
        if (!this.appId) {
            throw new Error("Init called with no app_id set");
        }
        if (!Intercom.initialized) {
            Intercom.initialized = true;
            injectIntercomScript(this.appId);
        }
    };
    Intercom.prototype.boot = function (settings) {
        if (_isNotBrowser)
            return;
        if (settings)
            this.settings = settings;
        if (!Intercom.initialized)
            this.init();
        this.command("boot", this.settings);
    };
    Intercom.prototype.destroy = function () {
        if (_isNotBrowser)
            return;
        this.command("shutdown");
        delete window.Intercom;
        delete window.intercomSettings;
    };
    Object.defineProperty(Intercom.prototype, "settings", {
        get: function () {
            if (_isNotBrowser)
                return notBrowserSettings;
            return window.intercomSettings;
        },
        set: function (settings) {
            if (_isNotBrowser) {
                notBrowserSettings = settings;
                return;
            }
            window.intercomSettings = settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Intercom.prototype, "appId", {
        get: function () {
            var _a;
            return (_a = this.settings) === null || _a === void 0 ? void 0 : _a.app_id;
        },
        enumerable: true,
        configurable: true
    });
    Intercom.prototype.command = function (command, options) {
        if (_isNotBrowser)
            return;
        if (!Intercom.initialized) {
            console.warn("Intercom not initialized, skipping command", command, options);
            return;
        }
        try {
            window.Intercom(command, options);
        }
        catch (err) {
            console.error("Failed to execute Intercom command", command, options, err);
        }
    };
    Intercom.initialized = false;
    return Intercom;
}());
exports.Intercom = Intercom;
exports.default = Intercom.getInstance;
