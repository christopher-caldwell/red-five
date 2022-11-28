#!/bin/sh

Red="\033[0;31m"    # Red
Green="\033[0;32m"  # Green
BICyan="\033[1;96m" # Bold Cyan
Color_Off="\033[0m" # Text Reset

printf "\n\n$BICyan$(echo Building the project..:)$Color_Off"
printf "\n\n"

rm -r bin/ui
rm bin/main.js

yarn nx run api:build:production
if [ $? != 0 ]; then
  printf "\n\n$Red$(echo API build failed.)$Color_Off"
  exit 1
fi

yarn nx run ui:build:production
if [ $? != 0 ]; then
  printf "\n\n$Red$(echo UI build failed.)$Color_Off"
  exit 1
fi


printf "\n\n$BICyan$(echo Bumping the version number..)$Color_Off"

# standard-version

printf "\n\n$BICyan$(echo Publishing new version..)$Color_Off"

# git push --follow-tags origin master

# yarn publish --access=public
