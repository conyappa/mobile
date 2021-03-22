import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import es from './es';

export default function setupLocalization() {
  i18n.defaultLocale = 'es';
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
  i18n.translations = {
    es,
  };
}
