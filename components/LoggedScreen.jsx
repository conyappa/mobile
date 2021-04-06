import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { StyleUtils } from '@/utils/styles';

import ScrollableScreen from './ScrollableScreen.jsx';

export default function LoggedScreen({ children }) {
  return (
    <ScrollableScreen>
      <Container>
        {children}
      </Container>
    </ScrollableScreen>
  );
}

LoggedScreen.propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = styled.SafeAreaView`
  ${StyleUtils.spacedX()}
  ${StyleUtils.spacedTop('xl')}
  ${StyleUtils.spacedBottom()}
`;
