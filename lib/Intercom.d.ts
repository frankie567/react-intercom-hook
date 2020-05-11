declare global {
    interface Window {
        Intercom: (command: IntercomCommand, options?: IntercomOptions) => void;
        intercomSettings: IntercomSettings;
        attachEvent?: (event: string, callback: Function) => void;
    }
}
export declare enum IntercomAlignment {
    Left = "left",
    Right = "right"
}
export declare type IntercomAvatar = {
    type: string;
    image_url: string;
};
export declare type IntercomCompany = {
    company_id: string;
    name?: string;
    created_at?: string;
    plan?: string;
    monthy_spend?: number;
    user_count?: number;
    size?: number;
    website?: string;
    industry?: string;
};
export declare type IntercomMessengerAttributes = {
    app_id: string;
    custom_launcher_selector?: string;
    alignment?: IntercomAlignment;
    vertical_padding?: number;
    horizontal_padding?: number;
    hide_default_launcher?: boolean;
    session_duration?: number;
    action_color?: string;
    background_color?: string;
};
export declare type IntercomDataAttributes = {
    email?: string;
    user_id?: string;
    created_at?: string;
    name?: string;
    phone?: string;
    readonly last_request_at?: number;
    unsubscribed_from_emails?: boolean;
    language_override?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_medium?: string;
    utm_source?: string;
    utm_term?: string;
    avatar?: IntercomAvatar;
    user_hash?: string;
    company?: IntercomCompany;
    companies?: IntercomCompany[];
} & {
    [custom_user_attribute: string]: string | number | boolean | null;
};
export declare type IntercomSettings = IntercomMessengerAttributes & IntercomDataAttributes;
export declare type IntercomCommand = "boot" | "shutdown" | "hide" | "update" | "show" | "showNewMessage" | "showMessages" | "onHide" | "onShow" | "onUnreadCountChange" | "trackEvent" | "getVisitorId" | "startTour" | "reattach_activator";
export declare type IntercomOptions = unknown;
export declare class Intercom {
    private static initialized;
    private static instance;
    static getInstance(settings?: IntercomSettings): Intercom;
    constructor(settings: IntercomSettings);
    init(): void;
    boot(settings?: IntercomSettings): void;
    destroy(): void;
    get settings(): IntercomSettings;
    set settings(settings: IntercomSettings);
    get appId(): string | undefined;
    command(command: IntercomCommand, options?: IntercomOptions): void;
}
declare const _default: typeof Intercom.getInstance;
export default _default;
