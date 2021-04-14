/* eslint-disable import/prefer-default-export */
import I18n from 'i18n-js';

export function formatCurrency(value) {
  return I18n.toCurrency(value, { delimiter: '.', precision: 0 });
}
