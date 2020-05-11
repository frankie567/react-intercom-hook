import { useEffect, useState } from "react";
import getInstance from "./Intercom";
export var useIntercom = function (settings) {
    var _a = useState(getInstance(settings)), intercom = _a[0], setIntercom = _a[1];
    useEffect(function () {
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
            setIntercom(getInstance(settings));
        }
    }, [intercom, settings]);
    return intercom.command;
};
export default useIntercom;
