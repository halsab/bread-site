import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });

const build = spawnSync(process.execPath, ["scripts/run-framework.mjs", "build"], {
  stdio: "inherit",
  env: { ...process.env, BREAD_DEPLOY_TARGET: "github-pages" },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const prepare = spawnSync(process.execPath, ["scripts/prepare-pages-output.mjs"], {
  stdio: "inherit",
});
if (prepare.error) throw prepare.error;
process.exit(prepare.status ?? 1);
