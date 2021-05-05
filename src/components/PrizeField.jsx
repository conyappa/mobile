import React from 'react';
import styled from 'styled-components/native';
import I18n from 'i18n-js';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { StyleUtils, COLORS } from '@/utils/styles';

import AppText from '@/components/AppText.jsx';

export default function PrizeField({ matches, prize: { value, isShared } }) {
  return (
    <Container>
      <WhiteText>
        { matches }
      </WhiteText>
      <Prize>
        <PrizeText>
          { I18n.toCurrency(value) }
        </PrizeText>
        {
          isShared && <SharedIcon name="group" />
        }
      </Prize>
    </Container>
  );
}

PrizeField.propTypes = {
  matches: PropTypes.string.isRequired,
  prize: PropTypes.shape({
    value: PropTypes.number,
    isShared: PropTypes.bool,
  }).isRequired,
};

const Container = styled.View`
  align-items: center;
  background-color: ${COLORS.blue};
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.paddedX()}
  ${StyleUtils.paddedY('sm')}
  ${StyleUtils.rounded('sm')}
  ${StyleUtils.spacedTop('xs')}
`;

const WhiteText = styled(AppText)`
  color: white;
`;

const Prize = styled.View`
  align-items: center;
  flex-direction: row;
`;

const PrizeText = styled(AppText)`
  color: ${COLORS.green};
  font-weight: 600;
`;

const SharedIcon = styled(MaterialIcons)`
  color: ${COLORS.green};
  ${StyleUtils.spacedLeft('xs')}
`;
