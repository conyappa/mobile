export const COLORS = {
  green: '#88EAB7',
  lightGreen: '#ABFFD4',
  darkGreen: '#276b47',
  blue: '#343457',
  lightBlue: '#8989c7',
  darkBlue: '#1b1b36',
  white: '#FFFFFF',
  gray500: '#6B7280',
  gray800: '#1F2937',
  red300: '#FCA5A5',
  red500: '#EF4444',
};

export const SPACING = {
  xs: 6,
  sm: 12,
  md: 18,
  lg: 32,
  xl: 56,
};

export const TEXT_SIZES = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const ICON_SIZES = {
  lg: 32,
};

export const StyleUtils = {
  fontSize: (size = 'md') => `font-size: ${TEXT_SIZES[size]}px;`,
  spaced: (size = 'md') => `margin: ${SPACING[size]}px;`,
  spacedTop: (size = 'md') => `margin-top: ${SPACING[size]}px;`,
  spacedBottom: (size = 'md') => `margin-bottom: ${SPACING[size]}px;`,
  spacedY: (size = 'md') => `margin-top: ${SPACING[size]}px; margin-bottom: ${SPACING[size]}px;`,
  spacedX: (size = 'md') => `margin-left: ${SPACING[size]}px; margin-right: ${SPACING[size]}px;`,
  spacedLeft: (size = 'md') => `margin-left: ${SPACING[size]}px`,
  padded: (size = 'md') => `padding: ${SPACING[size]}px;`,
  paddedTop: (size = 'md') => `padding-top: ${SPACING[size]}px;`,
  paddedY: (size = 'md') => `padding-top: ${SPACING[size]}px; padding-bottom: ${SPACING[size]}px;`,
  paddedX: (size = 'md') => `padding-left: ${SPACING[size]}px; padding-right: ${SPACING[size]}px;`,
  rounded: (size = 'md') => `border-radius: ${SPACING[size]}px;`,
};
