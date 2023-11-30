# Shipmunk

Welcome to Shipmunk, your go-to Chrome extension designed to streamline the process of purchasing shipping labels. Say goodbye to lengthy procedures and cumbersome steps—Shipmunk brings you an efficient, user-friendly solution right at your fingertips.

- [Getting Started](#getting-started)
  - [Setup](#setup)
  - [Run](#run)

## Getting Started

### Setup

The following tools are required or recommended for contributing and running Shipmunk. You can install them yourself, or use the included `bin/setup.sh` script to automate installation of all project pre-requisites.

- [Node](https://nodejs.org/en/) v18.x – everyone's favorite JavaScript runtime. A Node version of 18.x is required to run the application, and is pinned in the `.tool-versions` file.
- [Yarn](https://yarnpkg.com/) v3.x – Node package manager. required for managing dependencies and workspaces in the monorepo, as well as running commands defined in the `package.json` files
- Auctane VPN access – if you don't already have access to the VPN, contact the [Auctane IT department](https://auctane.atlassian.net/servicedesk/customer/portal/1).

### Decrypt Secrets

Before running the application locally, you must decrypt secrets using `git-crypt`. To do this, you must first download the **Shipmunk git-crypt key** from the ShipEngine – Engineering 1Password vault and place it at the root of your local copy of this repository. With the file in place, run `yarn crypt:unlock` to decypt all encrypted files.

### Run

1. Run `yarn`(check your node version >= 16)
2. Run `yarn dev` or `npm run dev`
3. Load Extension on Chrome
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Check - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
4. If you want to build in production, Just run `yarn build` or `npm run build`.
5. (optional) go to localhost:3002/shopify_example.html to see an example shopify order page to test extension on.
