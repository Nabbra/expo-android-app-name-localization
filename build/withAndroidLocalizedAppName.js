"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidLocalizedAppName = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_plugins_1 = require("@expo/config-plugins");
const stringsXmlTemplate = (appName) => `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">${appName}</string>
</resources>`;
const withAndroidLocalizedAppName = (config, { localizedAppNames }) => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'android',
        async (config) => {
            const androidPath = config.modRequest.projectRoot;
            const resDir = path_1.default.join(androidPath, 'android', 'app', 'src', 'main', 'res');
            for (const [locale, name] of Object.entries(localizedAppNames)) {
                const dirName = locale === 'default' ? 'values' : `values-${locale}`;
                const targetDir = path_1.default.join(resDir, dirName);
                const filePath = path_1.default.join(targetDir, 'strings.xml');
                if (!fs_1.default.existsSync(targetDir)) {
                    fs_1.default.mkdirSync(targetDir, { recursive: true });
                }
                fs_1.default.writeFileSync(filePath, stringsXmlTemplate(name));
            }
            return config;
        }
    ]);
};
exports.withAndroidLocalizedAppName = withAndroidLocalizedAppName;
