import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import {
  floor, map, times, toUpper, toString, padStart,
} from 'lodash';
import {
  format, parse, set, isBefore, addDays, differenceInSeconds, isToday,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { View } from 'react-native';
import useInterval from 'react-use/lib/useInterval';
import useAsync from 'react-use/lib/useAsync';

import {
  COLORS, SPACING, StyleUtils, TEXT_SIZES,
} from '@/utils/styles';
import api from '@/api';

import AppText from './AppText.jsx';

const getDayInitial = (day) => (
  toUpper(format(day, 'eeeee', { locale: es }))
);

function getNextPickDate() {
  const current = new Date();
  const todayAtNine = set(current, { hours: 21, minutes: 0, seconds: 0 });
  if (isBefore(current, todayAtNine)) {
    return todayAtNine;
  }

  return addDays(todayAtNine, 1);
}

const formatTimeValue = (value) => (
  padStart(toString(value), 2, '0')
);

export default function OngoingDraw({ style }) {
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const { value: prizes } = useAsync(async () => {
    const { data: { prizes: apiPrizes } } = await api.draws.retrieveMetadata();
    return apiPrizes;
  }, []);

  function fetchOngoingDraw() {
    api.draws.retrieveOngoing()
      .then(({ data: { results: ongoingResults, startDate: ongoingStartDate } }) => {
        setResults(ongoingResults);
        setStartDate(parse(ongoingStartDate, 'y-MM-dd', new Date()));
      });
  }

  useEffect(fetchOngoingDraw, []);
  useInterval(() => setCurrentTime(new Date()), 1000);

  const resultsSpaces = times(
    7,
    (index) => (
      {
        day: addDays(startDate, index),
        value: results[index] || '',
      }
    ),
  );

  const nextPickDate = getNextPickDate();
  const remainingSeconds = differenceInSeconds(nextPickDate, currentTime);

  return (
    <Container style={style}>
      <TitleText>
        {I18n.t('components.ongoingDraw.title')}
      </TitleText>
      <ResultsContainer>
        {
        map(
          resultsSpaces,
          ({ value, day }, index) => (
            <View key={`result-${index}`}>
              <ResultDayText>
                {getDayInitial(day)}
              </ResultDayText>
              <ResultValueContainer hasValue={!!value}>
                <ResultValueText>
                  {value}
                </ResultValueText>
              </ResultValueContainer>
            </View>
          ),
        )
      }
      </ResultsContainer>
      <JackpotContainer>
        <WhiteText>{I18n.t('components.ongoingDraw.jackpotTitle')}</WhiteText>
        {
          prizes && <JackpotText>{I18n.toCurrency(prizes['7'])}</JackpotText>
        }
      </JackpotContainer>
      <CounterContainer>
        <WhiteText>
          {
            I18n.t(
              'components.ongoingDraw.nextResultTime',
              {
                day: isToday(nextPickDate)
                  ? I18n.t('misc.today')
                  : I18n.t('misc.tomorrow'),
                time: format(nextPickDate, 'h a', { locale: es }),
              },
            )
          }
        </WhiteText>
        <Counter>
          <CounterTimeContainer>
            <CounterTextValue>
              {formatTimeValue(floor(remainingSeconds / 3600))}
            </CounterTextValue>
            <CounterTextUnit>{I18n.t('components.ongoingDraw.hoursUnit')}</CounterTextUnit>
          </CounterTimeContainer>
          <CounterTimeContainer>
            <CounterTextValue>
              {formatTimeValue(floor((remainingSeconds % 3600) / 60))}
            </CounterTextValue>
            <CounterTextUnit>{I18n.t('components.ongoingDraw.minutesUnit')}</CounterTextUnit>
          </CounterTimeContainer>
          <CounterTimeContainer>
            <CounterTextValue>
              {formatTimeValue(remainingSeconds % 60)}
            </CounterTextValue>
            <CounterTextUnit>{I18n.t('components.ongoingDraw.secondsUnit')}</CounterTextUnit>
          </CounterTimeContainer>
        </Counter>
      </CounterContainer>
    </Container>
  );
}

OngoingDraw.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(
      PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string],
      ),
    ),
  ]),
};

OngoingDraw.defaultProps = {
  style: {},
};

const Container = styled.View`
  background-color: ${COLORS.blue};
  ${StyleUtils.padded()}
  ${StyleUtils.rounded('sm')}
`;

const TitleText = styled(AppText)`
  color: white;
  font-weight: 600;
  ${StyleUtils.spacedTop('sm')}
  ${StyleUtils.fontSize('lg')}
`;

const ResultsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${StyleUtils.spacedTop()}
`;

const ResultDayText = styled(AppText)`
  color: white;
  text-align: center;
`;

const ResultValueContainer = styled.View`
  background-color: ${({ hasValue }) => (hasValue ? COLORS.green : COLORS.darkBlue)};
  height: ${TEXT_SIZES.xl}px;
  justify-content: center;
  ${StyleUtils.rounded('xs')}
  ${StyleUtils.spacedTop('xs')}
  width: ${TEXT_SIZES.xl}px;
`;

const ResultValueText = styled(AppText)`
  color: ${COLORS.blue};
  text-align: center;
`;

const JackpotContainer = styled.View`
  border-color: ${COLORS.lightBlue};
  border-top-width: 1px;
  ${StyleUtils.paddedTop('lg')}
  ${StyleUtils.spacedTop()}
`;

const WhiteText = styled(AppText)`
  color: white;
`;

const JackpotText = styled(AppText)`
  color: ${COLORS.green};
  font-weight: 600;
  ${StyleUtils.fontSize('2xl')}
`;

const CounterContainer = styled.View`
  ${StyleUtils.spacedTop('lg')}
`;

const Counter = styled.View`
  flex-direction: row;
  justify-content: space-around;
  ${StyleUtils.spacedTop()}
`;

const CounterTimeContainer = styled.View`
  background-color: ${COLORS.darkBlue};
  justify-content: center;
  ${StyleUtils.rounded('xs')}
  ${StyleUtils.spacedTop('xs')}
  ${StyleUtils.paddedX()}
  ${StyleUtils.paddedY()}
`;

const CounterTextValue = styled(AppText)`
  color: white;
  font-weight: 600;
  ${StyleUtils.fontSize('xl')}
  text-align: center;
  width: ${SPACING.xl}px;
`;

const CounterTextUnit = styled(AppText)`
  color: ${COLORS.green};
  text-align: center;
`;
