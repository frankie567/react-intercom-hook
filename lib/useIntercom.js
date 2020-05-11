"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Intercom_1 = __importDefault(require("./Intercom"));
exports.useIntercom = function (settings) {
    var _a = react_1.useState(Intercom_1.default(settings)), intercom = _a[0], setIntercom = _a[1];
    react_1.useEffect(function () {
        if (!settings || settings === intercom.settings)
            return;
        var isChanged = function (attr) {
            return undefined !== intercom.settings[attr] &&
                settings[attr] !== intercom.settings[attr];
        };
        if (!!intercom.appId && ["app_id", "user_id", "email"].some(isChanged)) {
            // app_id or user changed, restart session
            intercom.command("shutdown");
            if (settings.app_id)
                intercom.boot(settings);
        }
        else if (!!settings.app_id && settings.app_id === intercom.appId) {
            // update current session
            intercom.command("update", settings);
        }
        else {
            // reset intercom
            setIntercom(Intercom_1.default(settings));
        }
    }, [intercom, settings]);
    return intercom.command;
};
exports.default = exports.useIntercom;
