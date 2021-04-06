import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Clipboard from 'expo-clipboard';
import I18n from 'i18n-js';

import {
  COLORS, StyleUtils,
} from '@/utils/styles';

import AppText from './AppText.jsx';

const COPIED_CONFIRMATION_DURATION = 1000;

export default function BankField({ name, value, style }) {
  const [message, setMessage] = useState(I18n.t('screens.bank.copy'));
  const [highlightMessage, setHighlightMessage] = useState(false);

  function copyValue() {
    Clipboard.setString(value);
    setMessage(I18n.t('screens.bank.copied'));
    setHighlightMessage(true);
    setTimeout(() => {
      setMessage(I18n.t('screens.bank.copy'));
      setHighlightMessage(false);
    }, COPIED_CONFIRMATION_DURATION);
  }
  return (
    <TouchableOpacity
      onPress={copyValue}
    >
      <Container style={style}>
        <View>
          <NameText>
            {name}
          </NameText>
          <ValueText>
            {value}
          </ValueText>
        </View>
        <View>
          <MessageText
            highlight={highlightMessage}
          >
            { message }
          </MessageText>
        </View>
      </Container>
    </TouchableOpacity>
  );
}

BankField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(
      PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string],
      ),
    ),
  ]),
};

BankField.defaultProps = {
  style: {},
};

const Container = styled.View`
  align-items: center;
  background-color: ${COLORS.blue};
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.paddedX('sm')}
  ${StyleUtils.paddedY('xs')}
  ${StyleUtils.rounded('sm')}
`;

const NameText = styled(AppText)`
  color: ${COLORS.lightBlue};
  ${StyleUtils.fontSize('sm')}
`;

const ValueText = styled(AppText)`
  color: white;
`;

const MessageText = styled(AppText)`
  color: ${({ highlight }) => (highlight ? 'white' : COLORS.lightBlue)};
  ${StyleUtils.fontSize('sm')}
`;
