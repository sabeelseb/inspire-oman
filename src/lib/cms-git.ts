import { execFile } from "child_process";
import { promisify } from "util";
import { NextResponse } from "next/server";

const execFileAsync = promisify(execFile);

async function git(args: string[]) {
  const { stdout, stderr } = await execFileAsync("git", args, {
    cwd: process.cwd(),
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { stdout: stdout.trim(), stderr: stderr.trim() };
}

export async function hasContentChanges() {
  const { stdout } = await git(["status", "--porcelain", "--", "content", "public/images/cms"]);
  return Boolean(stdout);
}

export async function commitDraft(message: string) {
  await git(["add", "--", "content", "public/images/cms"]);
  const staged = await git(["diff", "--cached", "--name-only"]);
  if (!staged.stdout) {
    return { committed: false, message: "No content changes to save as draft." };
  }
  await git(["commit", "-m", message]);
  return { committed: true, message: "Draft saved (local git commit)." };
}

export async function publishLive() {
  await git(["add", "--", "content", "public/images/cms"]);
  const staged = await git(["diff", "--cached", "--name-only"]);
  if (staged.stdout) {
    await git(["commit", "-m", "Publish CMS content updates."]);
  }

  try {
    await git(["push", "origin", "HEAD"]);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Push failed";
    return {
      ok: false as const,
      message: `Commit done locally, but push failed: ${detail}. Run git push manually.`,
    };
  }

  return {
    ok: true as const,
    message: staged.stdout
      ? "Published - changes committed and pushed to live."
      : "Already up to date - pushed current branch to live.",
  };
}

export function guardLocalCmsAction() {
  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Draft/Publish git actions only work when running locally (npm run dev). On Vercel, edit locally then Publish from your machine.",
      },
      { status: 400 }
    );
  }
  return null;
}
