import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { COLORS, StyleUtils } from '../utils/styles';

import AppText from './AppText.jsx';

export default function Button({ title, onPress, style }) {
  return (
    <Container
      onPress={onPress}
      style={style}
    >
      <View>
        <AppText>{title}</AppText>
      </View>
    </Container>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.arrayOf(PropTypes.object),
};

Button.defaultProps = {
  style: [],
};

const Container = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.green};
  justify-content: center;
  ${StyleUtils.padded()}
  ${StyleUtils.rounded('sm')}
  width: 100%;
`;
