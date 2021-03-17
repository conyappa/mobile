export const COLORS = {
  green: '#88eab7',
  darkBlue: '#343457',
  gray: '#808080',
  darkGray: '#404040',
};

export const TEXT_SIZES = {
  md: 18,
};

export const ICON_SIZES = {
  lg: 32,
};

export const StyleUtils = {
  fontSize: (size = 'md') => `font-size: ${TEXT_SIZES[size]}px;`,
};
