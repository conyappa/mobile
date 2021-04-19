#!/bin/sh

# Exit on error
set -e

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

# Assign app metadata file name
METADATA_FILE="$BASE_REPOSITORY_FOLDER/app.json"

# Get old versions
# (for the android version, get the versionCode line, remove commas,
# split by spaces and get the last element)
OLD_SEMVER_VERSION=$(yarn --silent getversion)
OLD_INTEGER_VERSION=$(grep $METADATA_FILE -e '"versionCode":' | sed 's/,//' | rev | cut -d' ' -f1 | rev)

# Bump up package.json version and get new versions
yarn version --no-git-tag-version --$1
NEW_SEMVER_VERSION=$(yarn --silent getversion)
NEW_INTEGER_VERSION=$(($OLD_INTEGER_VERSION + 1))

# Get app metadata substitution strings
OLD_SEMVER_VERSION_SUBSTITUTION=$(echo \": \"$OLD_SEMVER_VERSION\",)
NEW_SEMVER_VERSION_SUBSTITUTION=$(echo \": \"$NEW_SEMVER_VERSION\",)
OLD_INTEGER_VERSION_SUBSTITUTION=$(echo \": $OLD_INTEGER_VERSION,)
NEW_INTEGER_VERSION_SUBSTITUTION=$(echo \": $NEW_INTEGER_VERSION,)

# Substitute the versions in the app metadata file
sed -i.tmp "s#$OLD_SEMVER_VERSION_SUBSTITUTION#$NEW_SEMVER_VERSION_SUBSTITUTION#g" $METADATA_FILE && rm $METADATA_FILE.tmp
sed -i.tmp "s#$OLD_INTEGER_VERSION_SUBSTITUTION#$NEW_INTEGER_VERSION_SUBSTITUTION#g" $METADATA_FILE && rm $METADATA_FILE.tmp

# Commit changes into release branch
git checkout -b release/prepare-$NEW_SEMVER_VERSION &&
git add $BASE_REPOSITORY_FOLDER/package.json &&
git add $METADATA_FILE &&
git commit --message "chore: prepare $NEW_SEMVER_VERSION release"
