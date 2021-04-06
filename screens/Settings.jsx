import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import I18n from 'i18n-js';
import { COLORS, StyleUtils } from '@/utils/styles';

import AppText from '@/components/AppText.jsx';
import ScreenContainer from '@/components/containers/VerticallyCenteredScreenContainer.jsx';
import TouchableText from '@/components/TouchableText.jsx';

export default function Settings({ logout }) {
  return (
    <ScreenContainer>
      <TitleText>{ I18n.t('screens.settings.rulesTitle') }</TitleText>
      <RulesText>
        { I18n.t('misc.rules') }
      </RulesText>
      <TitleText>{ I18n.t('screens.settings.logoutTitle') }</TitleText>
      <SpacedLogout
        onPress={logout}
        textColor={COLORS.red500}
      >
        { I18n.t('session.logout') }
      </SpacedLogout>
    </ScreenContainer>
  );
}

Settings.propTypes = {
  logout: PropTypes.func.isRequired,
};

const RulesText = styled(AppText)`
  ${StyleUtils.spacedX('lg')}
  ${StyleUtils.spacedBottom('xl')}
  text-align: justify;
`;

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const SpacedLogout = styled(TouchableText)`
  ${StyleUtils.spacedTop()}
`;
