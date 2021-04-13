#!/bin/sh

if [ $(git symbolic-ref --short HEAD) != master ]; then
    echo "This script is supposed to be run on the \"master\" branch."
    exit 1
fi

if [ -z $1 ]; then
    echo "A bump rule (\"patch\", \"minor\", \"major\") must be passed as a parameter."
    exit 1
fi

# Get base repository folder
SCRIPTS_FOLDER=$(cd $(dirname $0) && pwd)
BASE_REPOSITORY_FOLDER=$(dirname $SCRIPTS_FOLDER)

# Bump up package.json version and get new version
yarn version --no-git-tag-version --$1

# Get new version
NEW_VERSION=$(yarn --silent getversion)

# Commit changes into release branch
git checkout -b release/prepare-$NEW_VERSION &&
git add $BASE_REPOSITORY_FOLDER/package.json &&
git commit --message "Prepare $NEW_VERSION release"
