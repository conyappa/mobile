import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { COLORS, SPACING, StyleUtils } from '../utils/styles';

import AppText from './AppText.jsx';

export default function Button({
  title, onPress, style, busy,
}) {
  return (
    <Container
      onPress={onPress}
      style={style}
      disabled={busy}
    >
      {
        busy ? (
          <ActivityIndicator color={COLORS.blue} size={18} />
        ) : (
          <Title>{title}</Title>
        )
      }
    </Container>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.arrayOf(PropTypes.object),
  busy: PropTypes.bool,
};

Button.defaultProps = {
  style: [],
  busy: false,
};

const Container = styled.TouchableOpacity`
  align-items: center;
  background-color: ${COLORS.green};
  height: ${SPACING.xl}px;
  justify-content: center;
  ${StyleUtils.padded()}
  ${StyleUtils.rounded('sm')}
  width: 100%;
`;

const Title = styled(AppText)`
  color: ${COLORS.blue};
`;
