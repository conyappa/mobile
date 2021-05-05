import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import I18n from 'i18n-js';

import {
  COLORS, StyleUtils, TEXT_SIZES,
} from '@/utils/styles';

import { MaterialIcons } from '@expo/vector-icons';
import AppText from './AppText.jsx';

export default function Ticket(
  { ticket: { picks, prize: { value: prizeValue, isShared } }, style },
) {
  return (
    <Container style={style}>
      <PicksContainer>
        {
        map(
          picks,
          ({ value: pickValue, inResults }, index) => (
            <PickContainer
              key={`pick-${index}`}
              inResults={inResults}
            >
              <PickText
                inResults={inResults}
              >
                {pickValue}
              </PickText>
            </PickContainer>
          ),
        )
      }
      </PicksContainer>
      <PrizeContainer>
        <PrizeText>
          { I18n.toCurrency(prizeValue) }
        </PrizeText>
        {
          isShared && <SharedIcon name="group" />
        }
      </PrizeContainer>
    </Container>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    picks: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        inResults: PropTypes.bool,
      }),
    ),
    prize: PropTypes.shape({
      value: PropTypes.number,
      isShared: PropTypes.bool,
    }),
  }).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(
      PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string],
      ),
    ),
  ]),
};

Ticket.defaultProps = {
  style: {},
};

const Container = styled.View`
  align-items: center;
  background-color: ${COLORS.green};
  ${StyleUtils.padded('sm')}
  ${StyleUtils.rounded('sm')}
`;

const PicksContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${COLORS.lightGreen};
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.padded('sm')}
  width: 100%;
`;

const PickContainer = styled.View`
  background-color: ${({ inResults }) => (inResults ? COLORS.blue : COLORS.lightGreen)};
  height: ${TEXT_SIZES.xl}px;
  justify-content: center;
  ${StyleUtils.rounded('xs')}
  width: ${TEXT_SIZES.xl}px;
`;

const PickText = styled(AppText)`
  color: ${({ inResults }) => (inResults ? 'white' : COLORS.blue)};
  text-align: center;
`;

const PrizeContainer = styled.View`
  align-items: center;
  background-color: ${COLORS.lightGreen};
  flex-direction: row;
  ${StyleUtils.spacedTop('sm')}
  ${StyleUtils.paddedY('xs')}
  ${StyleUtils.paddedX('sm')}
  ${StyleUtils.rounded()}
`;

const PrizeText = styled(AppText)`
  color: ${COLORS.blue};
`;

const SharedIcon = styled(MaterialIcons)`
  color: ${COLORS.blue};
  ${StyleUtils.spacedLeft('xs')}
`;
