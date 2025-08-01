Localize your Android app name per language using an Expo config plugin.

## Installation

```sh
npm install @nabbra/expo-android-app-name-localization
```

## Usage
app.config.js or app.config.ts

```js
import { withAndroidLocalizedAppName } from '@nabbra/expo-android-app-name-localization';

export default ({ config }) => {
  return withAndroidLocalizedAppName(config, {
    localizedAppNames: {
      default: 'My App',
      en: 'My App',
      ar: 'تطبيقي',
    },
  });
};
```

## License

MIT
