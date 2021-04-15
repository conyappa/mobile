import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { rutValidate, rutFormat, rutClean } from 'rut-helpers';

import {
  map, mapValues, omit, toInteger,
} from 'lodash';
import { COLORS, StyleUtils } from '@/utils/styles';
import api from '@/api';

import Button from '@/components/Button.jsx';
import TouchableText from '@/components/TouchableText.jsx';
import TextInput from '@/components/TextInput.jsx';
import AppText from '@/components/AppText.jsx';
import SessionScreen from '@/components/SessionScreen.jsx';
import { NavigatorIOS } from 'react-native';

const PASSWORD_MIN_LENGTH = 6;
const SIGNUP_FIELDS = [
  {
    name: 'email',
    rules: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  },
  { name: 'firstName', rules: { required: true } },
  { name: 'lastName', rules: { required: true } },
  {
    name: 'rut',
    rules: { required: true, validate: { rutValidate }, setValueAs: rutClean },
    formatter: rutFormat,
  },
  {
    name: 'password',
    rules: { required: true, minLength: PASSWORD_MIN_LENGTH },
    secureTextEntry: true,
  },
];

function getCheckDigit(rut) {
  const digit = rut.slice(rut.length - 1);
  if (digit.toLowerCase() === 'k') {
    return 10;
  }
  return toInteger(digit);
}

export default function Signup({ login }) {
  const navigation = useNavigation();
  const [alert, setAlert] = useState('');
  const [registering, setRegistering] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const {
    control, handleSubmit, formState, reset,
  } = useForm();

  function getInputError(name, rules) {
    const messageOptions = { name: I18n.t(`user.${name}`) };
    const { errors, isSubmitted } = formState;
    const { type: inputError } = errors[name] || {};
    const apiError = apiErrors[name];
    if (inputError && isSubmitted) {
      if (inputError === 'minLength') {
        return I18n.t(
          `errorMessage.${inputError}`,
          { ...messageOptions, min: rules.minLength },
        );
      }
      return I18n.t(`errorMessage.${inputError}`, messageOptions);
    }

    if (apiError) {
      return I18n.t(`errorMessage.api.${apiError}`, messageOptions);
    }

    return null;
  }

  function cleanApiError(name) {
    setApiErrors(omit(apiErrors, name));
  }

  async function attemptLogin(loginEmail, loginPassword) {
    const { error: internalError } = login(loginEmail, loginPassword);
    if (internalError) {
      navigation.navigate('Login');
    }
  }

  function onSubmit(data) {
    setRegistering(true);
    const { email, password, rut: completeRut } = data;
    const checkDigit = getCheckDigit(completeRut);
    const rut = toInteger(completeRut.slice(0, completeRut.length - 1));

    api.users.create({ ...data, rut, checkDigit })
      .then(() => {
        setAlert(I18n.t('session.signupSuccess'));
        reset();
        setApiErrors({});
        attemptLogin(email, password);
      })
      .catch(({ response: { data: errorData = {} } = {} }) => {
        setApiErrors(mapValues(errorData, () => 'alreadyExists'));
      })
      .finally(() => setRegistering(false));
  }

  return (
    <SessionScreen>
      <FormContainer>
        {
          map(
            SIGNUP_FIELDS,
            ({
              name, rules, secureTextEntry, formatter,
            }) => (
              <Controller
                key={`signupInput-${name}`}
                control={control}
                name={name}
                rules={rules}
                defaultValue=""
                render={({ onChange, onBlur, value }) => (
                  <SpacedInput
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      cleanApiError(name);
                    }}
                    value={formatter ? formatter(value) : value}
                    error={getInputError(name, rules)}
                    placeholder={I18n.t(`user.${name}`)}
                    secureTextEntry={secureTextEntry}
                  />
                )}
              />
            ),
          )
        }
      </FormContainer>
      {
        !!alert && <AlertText>{alert}</AlertText>
      }
      <SpacedButton
        title={I18n.t('session.signup')}
        onPress={handleSubmit(onSubmit)}
        busy={registering}
      />
      <SpacedSignupLink
        textColor={COLORS.green}
        onPress={() => navigation.navigate('Login')}
      >
        { I18n.t('session.login') }
      </SpacedSignupLink>
    </SessionScreen>
  );
}

Signup.propTypes = {
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

const AlertText = styled(AppText)`
  color: ${COLORS.white};
  ${StyleUtils.spacedTop()};
`;
