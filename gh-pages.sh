#!/usr/bin/env bash

set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" != "gh-pages" ]]; then
    echo "Aborting Please switch to gh-pages prior to running this script";
    exit 1;
fi

sed -i '/"name": "dashboard",/i \ \ "homepage": "https://yevgenybulochnik.github.io/hrsa-findings-dashboard",' ./dashboard/package.json

cd ./dashboard
REACT_APP_USE_LOCALSTORAGE=true yarn build

cd ..

mv ./dashboard/build/ .


echo "Bundle built and moved to project root"


read -p "Do you want to cleanup this branch for gh-pages, this will delete specific directories (y/n)" answer
case ${answer:0:1} in
    y|Y)
        rm -rf api dashboard etl .gitignore README.md tmuxp.yml docker*
        mv build/* .
        rm -rf build gh-pages.sh
        touch .nojekyll
    ;;
    * )
        echo "Exiting"
        exit 1
    ;;
esac
