import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--mist)]/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl text-[var(--cocoa)]">
            <span className="font-zh">{site.brand.zh}</span>
            <span className="ml-2 text-lg text-[var(--cocoa-soft)]/70">
              {site.brand.en}
            </span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--cocoa-soft)]">
            {site.tagline.zh}
            <span className="mt-1 block opacity-75">{site.tagline.en}</span>
          </p>
        </div>
        <div className="text-sm text-[var(--cocoa-soft)]">
          <p>
            WeChat {site.contact.wechatId}
          </p>
          <p>{site.contact.email}</p>
          <p className="mt-3 text-xs opacity-60">
            Placeholder brand — rename in{" "}
            <code className="rounded bg-black/5 px-1">src/content/site.ts</code>
          </p>
        </div>
      </div>
    </footer>
  );
}
