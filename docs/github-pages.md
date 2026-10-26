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

Release decision (approved by the product owner on 2026-10-26): proceed with the first public GitHub Pages deployment before completing all production-browser checks. Treat the first release as an initial publication followed by production verification and corrections as needed. This decision supersedes the earlier requirement to keep PR #3 in draft solely because reduced-motion and complete production network checks were unavailable. It does **not** mean those scenarios were tested or passed.

The product owner has also explicitly authorized publishing the current provisional editorial photographs and bread descriptions/ingredients as-is for the first release. This is acceptance of the known content risk, **not verification** of photographic authenticity, recipes, or allergens. The rye image remains provisional generated imagery and rye ingredients remain unverified as documented in `docs/landing-design.md` and `docs/image-inventory.md`. Validate and correct these assets and claims after publication; do not label them authenticated in documentation.

### Before merging PR #3

1. Confirm the latest pull-request GitHub Actions run passes lint, TypeScript, the original ChatGPT Sites/Workers build, the Pages static build, and artifact validation.
2. As a repository administrator, under **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Enabling Actions alone is insufficient. `actions/configure-pages` cannot enable a new Pages site with the default `GITHUB_TOKEN`.
3. Under **Settings → Environments → github-pages → Deployment branches and tags**, restrict deployments to `main`. Use **Selected branches and tags**, not **Protected branches only**, unless `main` is protected. Verify repository Actions permissions permit official Pages actions.
4. Mark the pull request ready and merge into `main`. This triggers deployment. Do not start a duplicate manual run.

Administrative settings require repository-owner access and may not be readable through external review tooling. If a required setting cannot be verified, record that uncertainty rather than assuming success; a failed first deployment must be diagnosed and the setting corrected. Do not claim publication until the production deployment succeeds.

### After merging

1. Check the **GitHub Pages** workflow: both artifact upload and deployment must succeed on `main`.
2. Open https://halsab.github.io/bread-site/ and validate the **actual production URL**. Check desktop, tablet and narrow mobile layouts; all eleven images; six locally hosted fonts; paths under `/bread-site/`; anchor navigation, keyboard focus, Telegram and MAX contacts; scroll-linked animations, reduced-motion behavior, and any browser console and network errors. Use the Codex built-in browser exclusively for agent-run browser testing. Explicitly report unavailable capabilities as unverified.
3. Track and correct verified production defects, recipe/ingredient and allergen accuracy, and provisional photography when confirmed source materials become available.
4. Keep the existing ChatGPT Sites deployment intact as a fallback until production is verified. If severe regressions are found, restore a known-working version through a new `main` deployment rather than assuming deleting the Pages workflow will restore the previous hosting.

Pull requests perform build checks but **never deploy**. Merging into `main` publishes automatically. The Pages workflow does not require a PAT or repository secret when the repository Pages source and Actions permissions are configured correctly.

## Troubleshooting and rollback

Use the failed workflow run's job logs to distinguish installation, compilation, artifact validation, upload, and deployment errors. A failed build cannot proceed to deployment.

To restore a previous working release, revert the relevant commit(s) on `main` and let the Pages workflow publish the restored content. Leave the existing ChatGPT Sites deployment intact until the new deployment has been checked.

For a future custom domain, configure DNS and the custom domain in GitHub repository Pages settings first. Reassess the `/bread-site` base path, static asset prefixes, and artifact layout; do not simply add a CNAME without changing the build strategy.
