import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { StyleUtils } from '@/utils/styles';

import ScrollableScreen from '@/components/ScrollableScreen.jsx';

export default function PaddedScreenContainer({ children }) {
  return (
    <ScrollableScreen>
      <Container>
        {children}
      </Container>
    </ScrollableScreen>
  );
}

PaddedScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = styled.SafeAreaView`
  ${StyleUtils.spacedX()}
  ${StyleUtils.spacedTop('xl')}
  ${StyleUtils.spacedBottom()}
`;
