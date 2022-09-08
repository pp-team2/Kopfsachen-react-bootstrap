#!/bin/sh

for filename in public/*; do echo "{url: '${filename#public/}', revision: null},"; done
