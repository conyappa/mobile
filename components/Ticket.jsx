import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { map } from 'lodash';
import {
  COLORS, StyleUtils, TEXT_SIZES,
} from '../utils/styles';

import AppText from './AppText.jsx';

export default function Ticket({ ticket: { picks, prize }, style }) {
  return (
    <Container style={style}>
      <PicksContainer>
        {
        map(
          picks,
          ({ value, inResults }, index) => (
            <PickContainer
              key={`pick-${index}`}
              inResults={inResults}
            >
              <PickText
                inResults={inResults}
              >
                {value}
              </PickText>
            </PickContainer>
          ),
        )
      }
      </PicksContainer>
      <PrizeContainer>
        <PrizeText>
          {`$ ${prize}`}
        </PrizeText>
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
    prize: PropTypes.number,
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
  background-color: ${COLORS.lightGreen};
  ${StyleUtils.spacedTop('sm')}
  ${StyleUtils.paddedY('xs')}
  ${StyleUtils.paddedX('sm')}
  ${StyleUtils.rounded()}
`;

const PrizeText = styled(AppText)`
  color: ${COLORS.blue};
`;
