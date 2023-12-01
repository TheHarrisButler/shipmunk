// vite.config.ts
import react from "file:///Users/jeff.sparrow/Workspaces/shipmunk/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///Users/jeff.sparrow/Workspaces/shipmunk/node_modules/vite/dist/node/index.js";
import { crx } from "file:///Users/jeff.sparrow/Workspaces/shipmunk/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import merge from "file:///Users/jeff.sparrow/Workspaces/shipmunk/node_modules/lodash/merge.js";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Shipmunk_beta",
  version: "0.0.1",
  options_page: "src/pages/options/index.html",
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_icon: {
      "32": "shipmunk.png"
    }
  },
  icons: {
    "128": "shipmunk.png"
  },
  permissions: ["activeTab"],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.tsx"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["shipmunk.png"],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/shipmunk.png"
  },
  icons: {
    "128": "public/shipmunk.png"
  },
  web_accessible_resources: [
    {
      resources: ["shipmunk.png"]
    }
  ]
};

// package.json
var package_default = {
  name: "shipmunk",
  displayName: "Shipmunk",
  version: "0.0.1",
  description: "A browser extension to easily buy shipping labels",
  license: "MIT",
  scripts: {
    build: "vite build",
    dev: 'concurrently --kill-others-on-fail "nodemon --exec vite build" "yarn start-server"',
    "start-server": "nodemon --watch server/server.ts --exec ts-node --esm server/server.ts",
    "crypt:lock": "git-crypt lock",
    "crypt:unlock": 'test -f ./shipmunk-git-crypt-key && git-crypt unlock ./shipmunk-git-crypt-key || echo "The ./shipmunk-git-crypt-key file missing. Download the file from the ShipEngine \u2013 Engineering 1Password vault."'
  },
  type: "module",
  dependencies: {
    "@packlink/giger": "^68.19.6",
    "@shipengine/alchemy": "^2.4.1",
    "@shipengine/elements": "^0.37.21",
    "@shipengine/react-api": "^0.23.3",
    concurrently: "^8.2.2",
    "copy-to-clipboard": "^3.3.3",
    cors: "^2.8.5",
    dotenv: "^16.3.1",
    express: "^4.18.2",
    i18next: "^23.7.6",
    jsonwebtoken: "^9.0.2",
    lodash: "^4.17.21",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-i18next": "^13.5.0",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^1.0.14",
    "@types/chrome": "^0.0.237",
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/lodash": "^4.14.197",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/webextension-polyfill": "^0.10.0",
    "@typescript-eslint/eslint-plugin": "^5.49.0",
    "@typescript-eslint/parser": "^5.49.0",
    "@vitejs/plugin-react-swc": "^3.0.1",
    autoprefixer: "^10.4.13",
    eslint: "^8.32.0",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.1",
    "eslint-plugin-react-hooks": "^4.3.0",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.21",
    tailwindcss: "^3.2.4",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4",
    vite: "^4.0.4"
  },
  engines: {
    node: ">=16.0.0",
    yarn: ">=3.0.0"
  },
  resolutions: {
    "@shipengine/alchemy": "^2.4.1",
    "@emotion/react": "11.11.1",
    "@types/react": "18.2.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0"
  },
  packageManager: "yarn@3.6.4"
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/jeff.sparrow/Workspaces/shipmunk";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...merge(manifest_default, isDev ? manifest_dev_default : {}),
  manifest_version: 3,
  name: isDev ? `DEV: ${package_default.displayName}` : package_default.displayName,
  description: package_default.description,
  version: package_default.version
};
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    }),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    })
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamVmZi5zcGFycm93L1dvcmtzcGFjZXMvc2hpcG11bmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qZWZmLnNwYXJyb3cvV29ya3NwYWNlcy9zaGlwbXVuay92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamVmZi5zcGFycm93L1dvcmtzcGFjZXMvc2hpcG11bmsvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBjcngsIE1hbmlmZXN0VjNFeHBvcnQgfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgbWVyZ2UgZnJvbSBcImxvZGFzaC9tZXJnZVwiO1xuXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuanNvblwiO1xuaW1wb3J0IGRldk1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0LmRldi5qc29uXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XG5jb25zdCBhc3NldHNEaXIgPSByZXNvbHZlKHJvb3QsIFwiYXNzZXRzXCIpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcInB1YmxpY1wiKTtcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIjtcblxuY29uc3QgZXh0ZW5zaW9uTWFuaWZlc3QgPSB7XG4gIC4uLm1lcmdlKG1hbmlmZXN0LCBpc0RldiA/IGRldk1hbmlmZXN0IDoge30pLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBuYW1lOiBpc0RldiA/IGBERVY6ICR7cGtnLmRpc3BsYXlOYW1lfWAgOiBwa2cuZGlzcGxheU5hbWUsXG4gIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBzcmNcIjogcm9vdCxcbiAgICAgIFwiQGFzc2V0c1wiOiBhc3NldHNEaXIsXG4gICAgICBcIkBwYWdlc1wiOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAganN4SW1wb3J0U291cmNlOiBcIkBlbW90aW9uL3JlYWN0XCIsXG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbXCJAZW1vdGlvbi9iYWJlbC1wbHVnaW5cIl0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIGNyeCh7XG4gICAgICBtYW5pZmVzdDogZXh0ZW5zaW9uTWFuaWZlc3QgYXMgTWFuaWZlc3RWM0V4cG9ydCxcbiAgICAgIGNvbnRlbnRTY3JpcHRzOiB7XG4gICAgICAgIGluamVjdENzczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgc291cmNlbWFwOiBpc0RldixcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gIH0sXG59KTtcbiIsICJ7XG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICBcIm5hbWVcIjogXCJTaGlwbXVua19iZXRhXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwib3B0aW9uc19wYWdlXCI6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiLFxuICBcImJhY2tncm91bmRcIjoge1xuICAgIFwic2VydmljZV93b3JrZXJcIjogXCJzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC50c1wiLFxuICAgIFwidHlwZVwiOiBcIm1vZHVsZVwiXG4gIH0sXG4gIFwiYWN0aW9uXCI6IHtcbiAgICBcImRlZmF1bHRfaWNvblwiOiB7XG4gICAgICBcIjMyXCI6IFwic2hpcG11bmsucG5nXCJcbiAgICB9XG4gIH0sXG4gIFwiaWNvbnNcIjoge1xuICAgIFwiMTI4XCI6IFwic2hpcG11bmsucG5nXCJcbiAgfSxcbiAgXCJwZXJtaXNzaW9uc1wiOiBbXCJhY3RpdmVUYWJcIl0sXG4gIFwiY29udGVudF9zY3JpcHRzXCI6IFtcbiAgICB7XG4gICAgICBcIm1hdGNoZXNcIjogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgIFwianNcIjogW1wic3JjL3BhZ2VzL2NvbnRlbnQvaW5kZXgudHN4XCJdXG4gICAgfVxuICBdLFxuICBcImRldnRvb2xzX3BhZ2VcIjogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXG4gICAge1xuICAgICAgXCJyZXNvdXJjZXNcIjogW1wic2hpcG11bmsucG5nXCJdLFxuICAgICAgXCJtYXRjaGVzXCI6IFtdXG4gICAgfVxuICBdXG59XG4iLCAie1xuICBcImFjdGlvblwiOiB7XG4gICAgXCJkZWZhdWx0X2ljb25cIjogXCJwdWJsaWMvc2hpcG11bmsucG5nXCJcbiAgfSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxMjhcIjogXCJwdWJsaWMvc2hpcG11bmsucG5nXCJcbiAgfSxcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xuICAgIHtcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcInNoaXBtdW5rLnBuZ1wiXVxuICAgIH1cbiAgXVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwic2hpcG11bmtcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIlNoaXBtdW5rXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIGJyb3dzZXIgZXh0ZW5zaW9uIHRvIGVhc2lseSBidXkgc2hpcHBpbmcgbGFiZWxzXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJjb25jdXJyZW50bHkgLS1raWxsLW90aGVycy1vbi1mYWlsIFxcXCJub2RlbW9uIC0tZXhlYyB2aXRlIGJ1aWxkXFxcIiBcXFwieWFybiBzdGFydC1zZXJ2ZXJcXFwiXCIsXG4gICAgXCJzdGFydC1zZXJ2ZXJcIjogXCJub2RlbW9uIC0td2F0Y2ggc2VydmVyL3NlcnZlci50cyAtLWV4ZWMgdHMtbm9kZSAtLWVzbSBzZXJ2ZXIvc2VydmVyLnRzXCIsXG4gICAgXCJjcnlwdDpsb2NrXCI6IFwiZ2l0LWNyeXB0IGxvY2tcIixcbiAgICBcImNyeXB0OnVubG9ja1wiOiBcInRlc3QgLWYgLi9zaGlwbXVuay1naXQtY3J5cHQta2V5ICYmIGdpdC1jcnlwdCB1bmxvY2sgLi9zaGlwbXVuay1naXQtY3J5cHQta2V5IHx8IGVjaG8gXFxcIlRoZSAuL3NoaXBtdW5rLWdpdC1jcnlwdC1rZXkgZmlsZSBtaXNzaW5nLiBEb3dubG9hZCB0aGUgZmlsZSBmcm9tIHRoZSBTaGlwRW5naW5lIFx1MjAxMyBFbmdpbmVlcmluZyAxUGFzc3dvcmQgdmF1bHQuXFxcIlwiXG4gIH0sXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcGFja2xpbmsvZ2lnZXJcIjogXCJeNjguMTkuNlwiLFxuICAgIFwiQHNoaXBlbmdpbmUvYWxjaGVteVwiOiBcIl4yLjQuMVwiLFxuICAgIFwiQHNoaXBlbmdpbmUvZWxlbWVudHNcIjogXCJeMC4zNy4yMVwiLFxuICAgIFwiQHNoaXBlbmdpbmUvcmVhY3QtYXBpXCI6IFwiXjAuMjMuM1wiLFxuICAgIFwiY29uY3VycmVudGx5XCI6IFwiXjguMi4yXCIsXG4gICAgXCJjb3B5LXRvLWNsaXBib2FyZFwiOiBcIl4zLjMuM1wiLFxuICAgIFwiY29yc1wiOiBcIl4yLjguNVwiLFxuICAgIFwiZG90ZW52XCI6IFwiXjE2LjMuMVwiLFxuICAgIFwiZXhwcmVzc1wiOiBcIl40LjE4LjJcIixcbiAgICBcImkxOG5leHRcIjogXCJeMjMuNy42XCIsXG4gICAgXCJqc29ud2VidG9rZW5cIjogXCJeOS4wLjJcIixcbiAgICBcImxvZGFzaFwiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWkxOG5leHRcIjogXCJeMTMuNS4wXCIsXG4gICAgXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjEuMC4xNFwiLFxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjM3XCIsXG4gICAgXCJAdHlwZXMvY29yc1wiOiBcIl4yLjguMTdcIixcbiAgICBcIkB0eXBlcy9qc29ud2VidG9rZW5cIjogXCJeOS4wLjVcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2hcIjogXCJeNC4xNC4xOTdcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjExLjE4XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4wLjEwXCIsXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS40OS4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNDkuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xM1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguMzIuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuNy4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzIuMVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjMuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMS4wXCIsXG4gICAgXCJub2RlbW9uXCI6IFwiXjIuMC4yMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjFcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMi40XCIsXG4gICAgXCJ0cy1ub2RlXCI6IFwiXjEwLjkuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuNFwiLFxuICAgIFwidml0ZVwiOiBcIl40LjAuNFwiXG4gIH0sXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xNi4wLjBcIixcbiAgICBcInlhcm5cIjogXCI+PTMuMC4wXCJcbiAgfSxcbiAgXCJyZXNvbHV0aW9uc1wiOiB7XG4gICAgXCJAc2hpcGVuZ2luZS9hbGNoZW15XCI6IFwiXjIuNC4xXCIsXG4gICAgXCJAZW1vdGlvbi9yZWFjdFwiOiBcIjExLjExLjFcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIjE4LjIuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCJcbiAgfSxcbiAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInlhcm5AMy42LjRcIlxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxPQUFPLFdBQVc7QUFDelQsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBNkI7QUFDdEMsT0FBTyxXQUFXOzs7QUNKbEI7QUFBQSxFQUNFLGtCQUFvQjtBQUFBLEVBQ3BCLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGNBQWdCO0FBQUEsRUFDaEIsWUFBYztBQUFBLElBQ1osZ0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLGNBQWdCO0FBQUEsTUFDZCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxhQUFlLENBQUMsV0FBVztBQUFBLEVBQzNCLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDRSxTQUFXLENBQUMsY0FBYyxlQUFlLFlBQVk7QUFBQSxNQUNyRCxJQUFNLENBQUMsNkJBQTZCO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFpQjtBQUFBLEVBQ2pCLDBCQUE0QjtBQUFBLElBQzFCO0FBQUEsTUFDRSxXQUFhLENBQUMsY0FBYztBQUFBLE1BQzVCLFNBQVcsQ0FBQztBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0Y7OztBQy9CQTtBQUFBLEVBQ0UsUUFBVTtBQUFBLElBQ1IsY0FBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsT0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLEVBQ1Q7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
