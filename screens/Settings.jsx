import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import I18n from 'i18n-js';
import { COLORS, StyleUtils } from '../utils/styles';

import AppText from '../components/AppText.jsx';
import ScreenContainer from '../components/ScreenContainer.jsx';
import TouchableText from '../components/TouchableText.jsx';

export default function Settings({ logout }) {
  return (
    <ScreenContainer>
      <AppText>Settings</AppText>
      <SpacedLogout
        onPress={logout}
        textColor={COLORS.red500}
      >
        { I18n.t(['session', 'logout']) }
      </SpacedLogout>
    </ScreenContainer>
  );
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
};

const SpacedLogout = styled(TouchableText)`
  ${StyleUtils.spacedTop()}
`;
