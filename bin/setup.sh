#!/usr/bin/env bash

set -o pipefail

# Set NPM_AUTH_TOKEN
if [[ -z "${NPM_AUTH_TOKEN}" ]]; then
    read -p "Please enter your NPM token: " npm_auth_token
    echo "export NPM_AUTH_TOKEN=${npm_auth_token}" >> ~/.zshenv
fi

# Set PACKLINK_NPM_AUTH_TOKEN
if [[ -z "${PACKLINK_NPM_AUTH_TOKEN}" ]]; then
    read -p "Please enter the Packlink NPM token (located in the ShipEngine - Engineering 1Password vault): " packlink_npm_auth_token
    echo "export PACKLINK_NPM_AUTH_TOKEN=${packlink_npm_auth_token}" >> ~/.zshenv
fi

source ~/.zshenv

# Install or update yarn
if [[ -x "$(command -v yarn)" ]]; then
    echo "Upgrading yarn..."
    brew upgrade yarn --quiet >/dev/null
else
    echo "Installing yarn..."
    brew install yarn >/dev/null
fi

# Install tools in .tool-versions file
echo "Installing tools defined in .tool-versions..."
asdf install

# Install application dependencies
echo "Installing node modules..."
yarn install

echo "Setup complete"

# Start a new zsh instance
exec zsh --login