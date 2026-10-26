# GitHub Pages publishing

The bakery site is prepared for publication at https://halsab.github.io/bread-site/ using GitHub Actions. GitHub Pages serves static files and does not run the ChatGPT Sites Worker.

## Build

Use Node.js 22 (minimum 22.13.0) and the repository lockfile:

```sh
npm run install:ci
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build:pages
```

`build:pages` enables Vinext static export only for this build, strips the `/bread-site` filesystem prefix from the deployment artifact, and checks that the expected images, fonts, scripts, and styles are available. The final **upload directory is `dist/pages/`**, not `dist/client/`.

The installed Vinext version exports `index.html` into `dist/client/` and may place compiled assets beneath `dist/client/bread-site/`. The packaging step overlays that asset directory into the deployment root, correcting font URLs emitted by Vinext, so Pages does not add the `/bread-site/` prefix twice. This one-page site uses `assetPrefix` (rather than `basePath`) to avoid a prerendering 404 in Vinext 1.0.0-beta.5. Adding routes requires revisiting the strategy.

To preview locally, serve `dist/pages` as the document root mounted at `/bread-site/`. A file-server preview at `/` would not reproduce the production URL structure. Browser checks must use the Codex built-in browser when run by an implementation agent.

The existing `npm run build` remains the ChatGPT Sites/Cloudflare Worker build.

## First publication

1. Review and merge the `github-pages` pull request into `main`.
2. In repository **Settings → Pages**, choose **GitHub Actions** under **Build and deployment → Source**. This is different from enabling GitHub Actions in the repository.
3. Under repository **Settings → Environments → github-pages**, limit deployment branches to `main` if environment protection is available.
4. In **Actions**, open the **GitHub Pages** workflow. The merge into `main` should trigger the first deployment; if necessary, use **Run workflow** on `main`.
5. Confirm the workflow succeeds and open https://halsab.github.io/bread-site/.
6. Inspect desktop and mobile rendering, asset loading, animations, navigation, contact links, and the browser console before retiring ChatGPT Sites.

Pull requests run the build and checks but **never deploy**. Merging into `main` publishes automatically. No repository secrets or personal access token are required for the official Pages deployment actions.

## Troubleshooting and rollback

Use the failed workflow run's job logs to distinguish installation, compilation, artifact validation, upload, and deployment errors. A failed build cannot proceed to deployment.

To restore a previous working release, revert the relevant commit(s) on `main` and let the Pages workflow publish the restored content. Leave the existing ChatGPT Sites deployment intact until the new deployment has been checked.

For a future custom domain, configure DNS and the custom domain in GitHub repository Pages settings first. Reassess the `/bread-site` base path, static asset prefixes, and artifact layout; do not simply add a CNAME without changing the build strategy.
