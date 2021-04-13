#!/bin/sh

# Builds the production version of the application.
# sh ./scripts/build.sh <ENV> <OS>
# Requires the environmental variables:
# - EXPO_TOKEN: Access Token for the expo account to use (when not authenticated)
# - APPLE_TEAM_ID: ID of the Apple Team (when building for iOS)

if [ -z $1 ]; then
    echo "An environment (\"production\", \"staging\") must be passed as a parameter."
    echo "Usage: sh ./scripts/build.sh <environment> <operating-system>"
    exit 1
fi

if [ $1 = "production" ]; then
  CHANNEL="production"
elif [ $1 = "staging" ]; then
  CHANNEL="default"
else
  echo "The environment passed doesn't correspond to a valid environment (\"production\", \"staging\")."
  exit 1
fi


if [ -z $2 ]; then
    echo "An operating system (\"ios\", \"android\") must be passed as a parameter."
    echo "Usage: sh ./scripts/build.sh <environment> <operating-system>"
    exit 1
fi

if [ $2 = "ios" ]; then
  expo build:ios \
    -t archive \
    --release-channel $CHANNEL \
    --team-id $APPLE_TEAM_ID \
    --skip-credentials-check \
    --no-publish \
    --no-wait
elif [ $2 = "android" ]; then
  expo build:android \
    -t app-bundle \
    --release-channel $CHANNEL \
    --no-publish \
    --no-wait
else
  echo "The operating system passed doesn't correspond to a valid operating system (\"ios\", \"android\")."
  exit 1
fi
