import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

function SetUpScrollView({ children }) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        height: '100%',
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      { children }
    </ScrollView>
  );
}

SetUpScrollView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default function ScrollableScreen({ children }) {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding">
      <SetUpScrollView>
        { children }
      </SetUpScrollView>
    </KeyboardAvoidingView>
  ) : (
    <SetUpScrollView>
      { children }
    </SetUpScrollView>
  );
}

ScrollableScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
