#!/usr/bin/env sh

# abort on errors
set -e

# clean build
rm -rf docs/.vitepress/dist

# build
npm run build:docs

# navigate into the build output directory
cd docs/.vitepress/dist

git init
git checkout -b deploy
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f https://github.com/placetopay-org/lightbox-sdk.git deploy


# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -