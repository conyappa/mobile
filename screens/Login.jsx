/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { COLORS, StyleUtils } from '../utils/styles';

import Button from '../components/Button.jsx';
import ScrollableScreen from '../components/ScrollableScreen.jsx';

const greenPigSource = require('../assets/green-pig.png');

export default function Login({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollableScreen>
        <Container>
          <SizedImage
            source={greenPigSource}
            resizeMode="contain"
          />
          <FormContainer>
            <StyledInput
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
            <StyledInput
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
              placeholder="Contraseña"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              secureTextEntry
            />
          </FormContainer>
          <SpacedButton title="Iniciar Sesión" onPress={() => login(email, password)} />
        </Container>
      </ScrollableScreen>
    </SafeAreaView>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
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
`;

const FormContainer = styled.View`
  ${StyleUtils.spacedTop('lg')};
  width: 100%;
`;

const SizedImage = styled.Image`
  height: 15%;
  max-width: 100%;
`;

const SpacedButton = styled(Button)`
  ${StyleUtils.spacedTop('lg')};
`;

const StyledInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: white;
  color: white;
  ${StyleUtils.padded('sm')};
  ${StyleUtils.spacedTop()};
  width: 100%;
`;
