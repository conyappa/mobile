import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import SafeAreaViewWrapper from './SafeAreaViewWrapper.jsx';

export default function VerticallyCenteredScreenContainer({ children }) {
  return (
    <SafeAreaViewWrapper>
      <Container>
        {children}
      </Container>
    </SafeAreaViewWrapper>
  );
}

VerticallyCenteredScreenContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
