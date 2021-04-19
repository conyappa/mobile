import * as Localization from 'expo-localization';
import I18n from 'i18n-js';

import es from './es';

export default function setupLocalization() {
  I18n.defaultLocale = 'es';
  I18n.locale = Localization.locale;
  I18n.fallbacks = true;
  I18n.translations = {
    es,
  };
}
