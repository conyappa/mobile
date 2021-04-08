#!/bin/sh

if [ $(git symbolic-ref --short HEAD) != master ]; then
    echo "This script is supposed to be run on the \"master\" branch."
    exit 1
fi

# Assign metadata file name
METADATA_FILE="app.json"

# Get versionCode line, remove commas, split by spaces and get the last element
OLD_VERSION=$(grep $METADATA_FILE -e '"versionCode":' | sed 's/,//' | rev | cut -d' ' -f1 | rev)

# Bump up version
NEW_VERSION=$(($OLD_VERSION + 1))

# Get substitution strings
OLD_SEMVERSION_SUBSTITUTION=$(echo \": \"$OLD_VERSION.0.0\",)
NEW_SEMVERSION_SUBSTITUTION=$(echo \": \"$NEW_VERSION.0.0\",)
OLD_STDVERSION_SUBSTITUTION=$(echo \": $OLD_VERSION,)
NEW_STDVERSION_SUBSTITUTION=$(echo \": $NEW_VERSION,)

# Substitute the versions in the metadata file
sed -i.tmp "s#$OLD_SEMVERSION_SUBSTITUTION#$NEW_SEMVERSION_SUBSTITUTION#g" $METADATA_FILE && rm $METADATA_FILE.tmp
sed -i.tmp "s#$OLD_STDVERSION_SUBSTITUTION#$NEW_STDVERSION_SUBSTITUTION#g" $METADATA_FILE && rm $METADATA_FILE.tmp

# Commit changes into build bump branch
git add $METADATA_FILE &&
git checkout -b build-bump/bump-to-version-$NEW_VERSION &&
git commit --message "Prepare build version $NEW_VERSION"
