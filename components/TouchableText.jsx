import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS } from '../utils/styles';

import AppText from './AppText.jsx';

export default function TouchableText({
  children, color, onPress, style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <AppText
        color={color}
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
}

TouchableText.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  style: PropTypes.arrayOf(PropTypes.object),
};

TouchableText.defaultProps = {
  color: COLORS.blue,
  style: [],
};
