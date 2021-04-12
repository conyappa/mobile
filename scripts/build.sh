#!/bin/sh

# Builds the production version of the application.
# sh ./scripts/build.sh <OS>

if [ -z $1 ]; then
    echo "An operating system (\"ios\", \"android\") must be passed as a parameter."
    exit 1
fi

if [ $1 = "ios" ]; then
  expo build:ios -t archive --release-channel production --no-publish
elif [ $1 = "android" ]; then
  expo build:android -t app-bundle --release-channel production --no-publish
else
  echo "The parameter passed doesn't correspond to a valid operating system (\"ios\", \"android\")."
  exit 1
fi
