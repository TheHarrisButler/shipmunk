#!/usr/bin/env bash

set -o pipefail

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