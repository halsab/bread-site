# GitHub Pages publishing

The bakery site is prepared for publication at https://mybakery.pro/ using GitHub Actions. GitHub Pages serves static files and does not run the ChatGPT Sites Worker. The custom-domain site is rooted at `/`, not the former `/bread-site/` URL path.

## Build

Use Node.js 22 (minimum 22.13.0) and the repository lockfile:

```sh
npm run install:ci
npm run lint
./node_modules/.bin/tsc --noEmit
npm run build:pages
```

`build:pages` enables Vinext static export only for this build and checks that the expected images, fonts, scripts, and styles are available at the custom-domain root. The final **upload directory is `dist/pages/`**, not `dist/client/`.

The Pages build uses neither `assetPrefix` nor `basePath`. Exported HTML, `/_next/`, `/fonts/`, `/images/`, and `/favicon.svg` are served from `/`. The packaging step copies `dist/client/` to `dist/pages/`, fixes Vinext font references when needed, rejects old `/bread-site/` URLs, and verifies that root-relative asset URLs resolve. Adding routes requires revisiting the strategy.

To preview locally, serve `dist/pages` as the document root mounted at `/`. A file-server preview at `/bread-site/` would not reproduce the custom-domain URL structure. Browser checks must use the Codex built-in browser when run by an implementation agent.

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
2. Open https://mybakery.pro/ and validate the **actual production URL**. Check desktop, tablet and narrow mobile layouts; all eleven images; six locally hosted fonts; root-relative asset paths; anchor navigation, keyboard focus, Telegram and MAX contacts; scroll-linked animations, reduced-motion behavior, and any browser console and network errors. Use the Codex built-in browser exclusively for agent-run browser testing. Explicitly report unavailable capabilities as unverified.
3. Track and correct verified production defects, recipe/ingredient and allergen accuracy, and provisional photography when confirmed source materials become available.
4. Keep the existing ChatGPT Sites deployment intact as a fallback until production is verified. If severe regressions are found, restore a known-working version through a new `main` deployment rather than assuming deleting the Pages workflow will restore the previous hosting.

Pull requests perform build checks but **never deploy**. Merging into `main` publishes automatically. The Pages workflow does not require a PAT or repository secret when the repository Pages source and Actions permissions are configured correctly.

## Troubleshooting and rollback

Use the failed workflow run's job logs to distinguish installation, compilation, artifact validation, upload, and deployment errors. A failed build cannot proceed to deployment.

To restore a previous working release, revert the relevant commit(s) on `main` and let the Pages workflow publish the restored content. Leave the existing ChatGPT Sites deployment intact until the new deployment has been checked.

## Custom-domain migration to mybakery.pro

This migration must be merged only after DNS and the GitHub Pages custom domain are configured. Merging to `main` automatically triggers the GitHub Pages build and deployment.

1. In the repository **Settings → Pages**, confirm **Source: GitHub Actions**, set **Custom domain** to `mybakery.pro`, save, and complete GitHub's domain ownership verification if requested. A repository `CNAME` file is ignored with GitHub Actions publishing and is not required.
2. At the DNS provider, replace old hosting records. Set four apex (`@`) `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Replace the `www` `A` record with a `CNAME` pointing to `halsab.github.io.`. Preserve MX, SPF TXT, autoconfig, autodiscover, and other mail records.
3. Confirm the domain's DNS and HTTPS status in Pages settings; enable **Enforce HTTPS** when available. DNS propagation and TLS certificate issuance may take time.
4. After a successful Pages deployment, verify `https://mybakery.pro/`: HTML, JavaScript, CSS, images, fonts, favicon, anchors, messenger links, and no missing `/_next/` resources. Verify that `https://www.mybakery.pro/` redirects to the apex domain. The previous `https://halsab.github.io/bread-site/` URL is not the post-migration production URL.
5. Keep the temporary `robots: { index: false, follow: true }` in `app/layout.tsx` while descriptions and photos are unapproved. Verify the static page includes a `noindex` robots meta tag. Remove it separately only for the eventual SEO launch.

The ChatGPT Sites/Cloudflare Worker deployment is separate and must remain functional. Do not change its deployment or bindings for this migration.

Official GitHub Pages guidance: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
