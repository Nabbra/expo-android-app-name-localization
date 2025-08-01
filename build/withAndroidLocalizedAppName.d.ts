import { ConfigPlugin } from '@expo/config-plugins';
type LocaleMap = {
    [locale: string]: string;
};
export type PluginProps = {
    localizedAppNames: LocaleMap;
};
export declare const withAndroidLocalizedAppName: ConfigPlugin<PluginProps>;
export {};
