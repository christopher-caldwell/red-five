#!/bin/sh

yarn --cwd api pre-build
yarn --cwd ui pre-build

cp -r ui/build bin/client
cp -r api/build/index.js bin