import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { COLORS, StyleUtils } from '../utils/styles';

export default function AppText({ children, style }) {
  return (
    <StyledText style={style}>
      { children }
    </StyledText>
  );
}

AppText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  style: PropTypes.arrayOf(PropTypes.object),
};

AppText.defaultProps = {
  style: [],
};

const StyledText = styled.Text`
  color: ${COLORS.gray800};
  ${StyleUtils.fontSize()}
`;
