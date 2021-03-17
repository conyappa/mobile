import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { COLORS, StyleUtils } from '../utils/styles';

export default function AppText({ children }) {
  return (
    <View>
      <StyledText>
        { children }
      </StyledText>
    </View>
  );
}

AppText.propTypes = {
  children: PropTypes.string.isRequired,
};

const StyledText = styled.Text`
  ${StyleUtils.fontSize('md')}
  color: ${COLORS.darkGray};
`;
