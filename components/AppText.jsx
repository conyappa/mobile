import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { COLORS, StyleUtils } from '../utils/styles';

export default function AppText({ children, color }) {
  return (
    <View>
      <StyledText color={color}>
        { children }
      </StyledText>
    </View>
  );
}

AppText.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

AppText.defaultProps = {
  color: COLORS.gray800,
};

const StyledText = styled.Text`
  color: ${({ color }) => color};
  ${StyleUtils.fontSize('md')}
`;
