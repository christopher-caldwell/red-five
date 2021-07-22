#!/bin/sh

Red="\033[0;31m"    # Red
BICyan="\033[1;96m" # Bold Cyan
Color_Off="\033[0m" # Text Reset

# Running the TypeScript compiler
printf "\n\n$BICyan$(echo Checking UI types)$Color_Off\n\n"
yarn lint

printf "\n\n$BICyan$(echo Building UI from source)$Color_Off\n\n"
yarn build