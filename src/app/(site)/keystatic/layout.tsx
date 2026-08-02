import { redirect } from "next/navigation";
import KeystaticApp from "./keystatic";
import CmsToolbar from "@/components/CmsToolbar";
import { isKeystaticEnabled } from "@/lib/cms-flags";

export const metadata = {
  title: "Inspire Oman CMS",
};

export default function KeystaticLayout() {
  if (!isKeystaticEnabled()) {
    redirect("/admin");
  }

  return (
    <div className="cms-admin flex h-[100dvh] flex-col overflow-hidden bg-white text-[#1a1a1a]">
      <CmsToolbar />
      <div className="cms-keystatic-shell relative min-h-0 flex-1 overflow-hidden">
        <KeystaticApp />
      </div>
    </div>
  );
}
