#!/bin/sh

# Builds the production version of the application.
# sh ./scripts/build.sh <OS>
# Requires the environmental variables:
# - EXPO_TOKEN: Access Token for the expo account to use
# - APPLE_TEAM_ID: ID of the Apple Team (when building for iOS)

if [ -z $1 ]; then
    echo "An operating system (\"ios\", \"android\") must be passed as a parameter."
    exit 1
fi

if [ $1 = "ios" ]; then
  expo build:ios \
    -t archive \
    --release-channel production \
    --team-id $APPLE_TEAM_ID \
    --skip-credentials-check \
    --no-publish \
    --no-wait
elif [ $1 = "android" ]; then
  expo build:android \
    -t app-bundle \
    --release-channel production \
    --no-publish \
    --no-wait
else
  echo "The parameter passed doesn't correspond to a valid operating system (\"ios\", \"android\")."
  exit 1
fi
