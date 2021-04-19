import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

function SetUpScrollView({ children, onRefresh, refreshing }) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        height: '100%',
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      refreshControl={
        onRefresh && (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        )
      }
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
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

SetUpScrollView.defaultProps = {
  onRefresh: null,
  refreshing: false,
};

export default function ScrollableScreen({ children, onRefresh, refreshing }) {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding">
      <SetUpScrollView
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        { children }
      </SetUpScrollView>
    </KeyboardAvoidingView>
  ) : (
    <SetUpScrollView
      onRefresh={onRefresh}
      refreshing={refreshing}
    >
      { children }
    </SetUpScrollView>
  );
}

ScrollableScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
};

ScrollableScreen.defaultProps = {
  onRefresh: null,
  refreshing: false,
};
