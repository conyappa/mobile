import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Linking } from 'react-native';

import I18n from 'i18n-js';
import { COLORS, StyleUtils } from '../utils/styles';

import AppText from '../components/AppText.jsx';
import ScreenContainer from '../components/ScreenContainer.jsx';
import TouchableText from '../components/TouchableText.jsx';

export default function Settings({ logout }) {
  return (
    <ScreenContainer>
      <TitleText>{ I18n.t('screens.settings.rulesTitle') }</TitleText>
      <RulesText>
        { I18n.t('misc.rules') }
      </RulesText>
      <MoreInfoText
        onPress={() => Linking.openURL('https://www.notion.so/conyappa/Informaci-n-Con-Yappa-f82daa1f76284e588c707ff6eb2a35e7')}
        textColor={COLORS.lightBlue}
      >
        Toca acá para más información
      </MoreInfoText>
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
  text-align: justify;
`;

const MoreInfoText = styled(TouchableText)`
  ${StyleUtils.spacedBottom('xl')}
`;

const TitleText = styled(AppText)`
  ${StyleUtils.fontSize('xl')}
`;

const SpacedLogout = styled(TouchableText)`
  ${StyleUtils.spacedTop()}
`;
