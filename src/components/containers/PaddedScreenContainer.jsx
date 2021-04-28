import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { StyleUtils } from '@/utils/styles';

import ScrollableScreen from '@/components/ScrollableScreen.jsx';
import SafeAreaViewWrapper from './SafeAreaViewWrapper.jsx';

export default function PaddedScreenContainer({ children, onRefresh, refreshing }) {
  return (
    <SafeAreaViewWrapper>
      <ScrollableScreen
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        <Container>
          {children}
        </Container>
      </ScrollableScreen>
    </SafeAreaViewWrapper>
  );
}

PaddedScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

PaddedScreenContainer.defaultProps = {
  onRefresh: null,
  refreshing: false,
};

const Container = styled.View`
  ${StyleUtils.spacedX()}
  ${StyleUtils.spacedY('sm')}
`;
