import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

import { COLORS, StyleUtils } from '@/utils/styles';

import Button from '@/components/Button.jsx';
import SessionScreen from '@/components/SessionScreen.jsx';
import TouchableText from '@/components/TouchableText.jsx';
import TextInput from '@/components/TextInput.jsx';

export default function Login({ login }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function typeText(callback) {
    function wrapper(text) {
      setError(null);
      callback(text);
    }
    return wrapper;
  }

  async function handleLogin(loginEmail, loginPassword) {
    setError(null);
    setLoading(true);
    const { error: internalError } = await login(loginEmail, loginPassword);
    if (!internalError) {
      return;
    }
    setLoading(false);
    if (internalError === 'ECONNABORTED') {
      setError(I18n.t('errorMessage.generic'));
    } else {
      setError(I18n.t('errorMessage.invalidUserPasswordCombination'));
    }
  }

  return (
    <SessionScreen>
      <FormContainer>
        <SpacedInput
          onChangeText={typeText(setEmail)}
          value={email}
          placeholder={I18n.t('user.email')}
          error={error}
          autoCapitalize="none"
        />
        <SpacedInput
          onChangeText={typeText(setPassword)}
          value={password}
          placeholder={I18n.t('user.password')}
          secureTextEntry
          error={error}
          autoCapitalize="none"
        />
      </FormContainer>
      <SpacedButton
        title={I18n.t('session.login')}
        onPress={() => handleLogin(email, password)}
        busy={loading}
      />
      <SpacedSignupLink
        textColor={COLORS.green}
        onPress={() => navigation.navigate('Signup')}
      >
        { I18n.t('session.signup') }
      </SpacedSignupLink>
    </SessionScreen>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const FormContainer = styled.View`
  ${StyleUtils.spacedTop('lg')};
  width: 100%;
`;

const SpacedButton = styled(Button)`
  ${StyleUtils.spacedTop('lg')};
`;

const SpacedSignupLink = styled(TouchableText)`
  ${StyleUtils.spacedTop()};
`;

const SpacedInput = styled(TextInput)`
  ${StyleUtils.spacedTop()};
`;
