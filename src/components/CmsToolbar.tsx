"use client";

import { useCallback, useState } from "react";

type ActionState = "idle" | "loading" | "ok" | "error";

function findKeystaticSaveButton(): HTMLButtonElement | null {
  const buttons = Array.from(document.querySelectorAll("button"));
  return (
    (buttons.find((b) => /^\s*save\s*$/i.test(b.textContent || "")) as
      | HTMLButtonElement
      | undefined) || null
  );
}

export default function CmsToolbar() {
  const [saveState, setSaveState] = useState<ActionState>("idle");
  const [draftState, setDraftState] = useState<ActionState>("idle");
  const [publishState, setPublishState] = useState<ActionState>("idle");
  const [message, setMessage] = useState("");

  const flash = useCallback((setter: (s: ActionState) => void, next: ActionState, msg: string) => {
    setter(next);
    setMessage(msg);
    window.setTimeout(() => {
      setter("idle");
      setMessage("");
    }, 3500);
  }, []);

  const onSave = () => {
    setSaveState("loading");
    const btn = findKeystaticSaveButton();
    if (btn && !btn.disabled) {
      btn.click();
      flash(setSaveState, "ok", "Save triggered - confirm in the editor if prompted.");
      return;
    }
    flash(
      setSaveState,
      "error",
      "Open an entry first, then click Save (or use Keystatic's Save button top-right)."
    );
  };

  const postAction = async (
    path: string,
    setter: (s: ActionState) => void,
    successMsg: string
  ) => {
    setter("loading");
    try {
      const res = await fetch(path, { method: "POST" });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || !data.ok) {
        flash(setter, "error", data.message || "Action failed.");
        return;
      }
      flash(setter, "ok", data.message || successMsg);
    } catch {
      flash(setter, "error", "Network error - try again.");
    }
  };

  return (
    <div className="shrink-0 border-b border-[#e5e5e5] bg-white text-[#1a1a1a]">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/IO-logo.svg"
            alt="Inspire Oman"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">Inspire Oman CMS</p>
            <p className="text-[11px] text-[#666]">Content dashboard</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={saveState === "loading"}
            className="rounded-md border border-[#d4d4d4] bg-white px-3.5 py-2 text-sm font-medium hover:bg-[#f5f5f5] disabled:opacity-60"
          >
            {saveState === "loading" ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() =>
              postAction("/api/cms/draft", setDraftState, "Draft saved locally (git commit).")
            }
            disabled={draftState === "loading"}
            className="rounded-md border border-[#C5A55A]/50 bg-[#C5A55A]/10 px-3.5 py-2 text-sm font-medium text-[#8a6f2e] hover:bg-[#C5A55A]/20 disabled:opacity-60"
          >
            {draftState === "loading" ? "Saving draft…" : "Save to draft"}
          </button>
          <button
            type="button"
            onClick={() =>
              postAction("/api/cms/publish", setPublishState, "Published to live (pushed).")
            }
            disabled={publishState === "loading"}
            className="rounded-md bg-[#C5A55A] px-3.5 py-2 text-sm font-semibold text-[#0A0A0A] hover:bg-[#d4af37] disabled:opacity-60"
          >
            {publishState === "loading" ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
      {message ? (
        <div className="border-t border-[#eee] bg-[#fafafa] px-4 py-1.5 text-xs text-[#444]">
          {message}
        </div>
      ) : null}
    </div>
  );
}
