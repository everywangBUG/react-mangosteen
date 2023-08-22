#!/usr/bin/env bash
cd dist
rm -rf dist
npm run build
git init
git add .
git commit -m deploy
git remote add origin git@github.com:everywangBUG/react-mangosteen_preview.git
git push -f origin master:master
cd -