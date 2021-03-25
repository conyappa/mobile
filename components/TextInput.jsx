import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { COLORS, StyleUtils } from '../utils/styles';
import AppText from './AppText.jsx';

export default function TextInput({
  onChangeText, value, placeholder, secureTextEntry, style, error,
}) {
  return (
    <>
      <StyledInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={style}
        placeholderTextColor={COLORS.lightBlue}
        selectionColor={COLORS.lightBlue}
        hasErrors={!!error}
      />
      {
        !!error && (
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
          </ErrorContainer>
        )
      }
    </>
  );
}

TextInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType(
    [
      PropTypes.bool,
      PropTypes.string,
    ],
  ),
  secureTextEntry: PropTypes.bool,
  style: PropTypes.arrayOf(PropTypes.object),
};

TextInput.defaultProps = {
  placeholder: '',
  error: false,
  secureTextEntry: false,
  style: [],
};

const StyledInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${({ hasErrors }) => (hasErrors ? COLORS.red300 : COLORS.white)};
  color: ${COLORS.white};
  ${StyleUtils.padded('sm')};
  width: 100%;
`;

const ErrorContainer = styled.View`
  ${StyleUtils.spacedTop('xs')};
`;

const ErrorText = styled(AppText)`
  color: ${COLORS.red300};
  ${StyleUtils.fontSize('sm')};
`;
