import { IntercomSettings, IntercomCommand } from "./Intercom";
export declare const useIntercom: (settings?: IntercomSettings | undefined) => (command: IntercomCommand, options?: unknown) => void;
export default useIntercom;
