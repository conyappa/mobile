/* eslint-disable react/style-prop-object */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { COLORS, StyleUtils } from '../utils/styles';

import ScrollableScreen from './ScrollableScreen.jsx';

const greenPigSource = require('../assets/green-pig.png');

export default function SessionScreen({ children }) {
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollableScreen>
        <Container>
          <SizedImage
            source={greenPigSource}
            resizeMode="contain"
          />
          { children }
        </Container>
      </ScrollableScreen>
    </SafeAreaView>
  );
}

SessionScreen.propTypes = {
  children: PropTypes.node.isRequired,
};

const SafeAreaView = styled.SafeAreaView`
  background-color: ${COLORS.blue};
  flex: 1;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  ${StyleUtils.padded('lg')}
  ${StyleUtils.spacedX('lg')}
`;

const SizedImage = styled.Image`
  height: 15%;
  max-width: 100%;
`;
