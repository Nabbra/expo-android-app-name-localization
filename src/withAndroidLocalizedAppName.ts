import fs from 'fs';
import path from 'path';
import { ConfigPlugin, withDangerousMod } from '@expo/config-plugins';

type LocaleMap = {
  [locale: string]: string;
};

export type PluginProps = {
  localizedAppNames: LocaleMap;
};

const stringsXmlTemplate = (appName: string) => `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">${appName}</string>
</resources>`;

const iosStringsTemplate = (appName: string) =>
  `"CFBundleDisplayName" = "${appName}";`;

export const withAndroidLocalizedAppName: ConfigPlugin<PluginProps> = (config, { localizedAppNames }) => {
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const androidPath = config.modRequest.projectRoot;
      const resDir = path.join(androidPath, 'android', 'app', 'src', 'main', 'res');
      for (const [locale, name] of Object.entries(localizedAppNames)) {
        const dirName = locale === 'default' ? 'values' : `values-${locale}`;
        const targetDir = path.join(resDir, dirName);
        const filePath = path.join(targetDir, 'strings.xml');
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.writeFileSync(filePath, stringsXmlTemplate(name));
      }
      return config;
    }
  ]);

  config = withDangerousMod(config, [
    'ios',
    async (config) => {
      const iosPath = config.modRequest.projectRoot;
      const iosProjectName = config.name;
      const iosProjectDir = path.join(iosPath, 'ios', iosProjectName);
      for (const [locale, name] of Object.entries(localizedAppNames)) {
        const lprojDir =
          locale === 'default'
            ? path.join(iosProjectDir, 'en.lproj')
            : path.join(iosProjectDir, `${locale}.lproj`);
        const filePath = path.join(lprojDir, 'InfoPlist.strings');
        if (!fs.existsSync(lprojDir)) {
          fs.mkdirSync(lprojDir, { recursive: true });
        }
        fs.writeFileSync(filePath, iosStringsTemplate(name));
      }
      return config;
    }
  ]);

  return config;
}
