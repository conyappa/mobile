import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { StyleUtils } from '@/utils/styles';

import ScrollableScreen from '@/components/ScrollableScreen.jsx';
import SafeAreaViewWrapper from './SafeAreaViewWrapper.jsx';

export default function PaddedScreenContainer({ children }) {
  return (
    <SafeAreaViewWrapper>
      <ScrollableScreen>
        <Container>
          {children}
        </Container>
      </ScrollableScreen>
    </SafeAreaViewWrapper>
  );
}

PaddedScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = styled.View`
  ${StyleUtils.spacedX()}
  ${StyleUtils.spacedTop('lg')}
  ${StyleUtils.spacedBottom()}
`;
