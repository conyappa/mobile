#!/bin/sh

if [ $(git symbolic-ref --short HEAD) != master ]; then
    echo "This script is supposed to be run on the \"master\" branch."
    exit 1
fi

if [ -z $1 ]; then
    echo "A bump rule (\"patch\", \"minor\", \"major\") must be passed as a parameter."
    exit 1
fi

# Bump up package.json version and get new version
yarn version --$1

# Get new version
NEW_VERSION=$(yarn --silent getversion)

# Commit changes into release branch
git add package.json &&
git checkout -b release/prepare-$NEW_VERSION &&
git commit --message "Prepare $NEW_VERSION release"
