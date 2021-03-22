export const COLORS = {
  green: '#88EAB7',
  blue: '#343457',
  white: '#FFFFFF',
  gray500: '#6B7280',
  gray800: '#1F2937',
  red500: '#EF4444',
};

export const SPACING = {
  sm: 12,
  md: 18,
  lg: 32,
  xl: 64,
};

export const TEXT_SIZES = {
  md: 18,
};

export const ICON_SIZES = {
  lg: 32,
};

export const StyleUtils = {
  fontSize: (size = 'md') => `font-size: ${TEXT_SIZES[size]}px;`,
  spaced: (size = 'md') => `margin: ${SPACING[size]}px;`,
  spacedTop: (size = 'md') => `margin-top: ${SPACING[size]}px;`,
  spacedBottom: (size = 'md') => `margin-bottom: ${SPACING[size]}px;`,
  padded: (size = 'md') => `padding: ${SPACING[size]}px;`,
  rounded: (size = 'md') => `border-radius: ${SPACING[size]}px;`,
};
