import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { COLORS } from '@/utils/styles';

import AppText from './AppText.jsx';

export default function TouchableText({
  children, textColor, onPress, style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <StyledText
        color={textColor}
      >
        {children}
      </StyledText>
    </TouchableOpacity>
  );
}

TouchableText.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  style: PropTypes.arrayOf(PropTypes.object),
};

TouchableText.defaultProps = {
  textColor: COLORS.blue,
  style: [],
};

const StyledText = styled(AppText)`
  ${({ color }) => color && `color: ${color}`}
`;
