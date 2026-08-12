export default function TitleHighlight({
  title,
  highlight,
  highlightClassName = "gold-text",
  breakAfter,
  breakClassName = "hidden lg:block",
}: {
  title: string;
  highlight?: string | null;
  highlightClassName?: string;
  /** Insert a line break after this substring (desktop by default). */
  breakAfter?: string | null;
  breakClassName?: string;
}) {
  const normalize = (value: string) =>
    value
      .replace(/[\u2018\u2019\u2032]/g, "'")
      .replace(/[\u201C\u201D]/g, '"');

  const matchAt = (haystack: string, needle: string) => {
    const raw = (needle || "").trim();
    if (!raw || !haystack) return null;

    const tryFind = (h: string, n: string) => {
      const i = h.indexOf(n);
      if (i >= 0) return { index: i, length: n.length };
      const li = h.toLowerCase().indexOf(n.toLowerCase());
      if (li >= 0) return { index: li, length: n.length };
      return null;
    };

    return (
      tryFind(haystack, raw) ||
      tryFind(normalize(haystack), normalize(raw))
    );
  };

  const renderWithBreak = (text: string) => {
    const found = breakAfter ? matchAt(text, breakAfter) : null;
    if (!found) return text;
    const cut = found.index + found.length;
    return (
      <>
        {text.slice(0, cut)}
        <br className={breakClassName} />
        {text.slice(cut)}
      </>
    );
  };

  const found = matchAt(title, highlight || "");
  if (!found) {
    return <>{renderWithBreak(title)}</>;
  }

  const before = title.slice(0, found.index);
  const word = title.slice(found.index, found.index + found.length);
  const after = title.slice(found.index + found.length);
  const gold = <span className={highlightClassName}>{word}</span>;

  if (breakAfter && matchAt(before, breakAfter)) {
    const br = matchAt(before, breakAfter)!;
    const cut = br.index + br.length;
    return (
      <>
        {before.slice(0, cut)}
        <br className={breakClassName} />
        {before.slice(cut)}
        {gold}
        {after}
      </>
    );
  }

  if (breakAfter && matchAt(`${before}${word}`, breakAfter)) {
    return (
      <>
        {before}
        {gold}
        <br className={breakClassName} />
        {after.replace(/^\s+/, "")}
      </>
    );
  }

  return (
    <>
      {before}
      {gold}
      {renderWithBreak(after)}
    </>
  );
}
