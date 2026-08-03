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
  const renderWithBreak = (text: string) => {
    if (!breakAfter || !text.includes(breakAfter)) return text;
    const index = text.indexOf(breakAfter) + breakAfter.length;
    return (
      <>
        {text.slice(0, index)}
        <br className={breakClassName} />
        {text.slice(index)}
      </>
    );
  };

  if (!highlight || !title.includes(highlight)) {
    return <>{renderWithBreak(title)}</>;
  }

  const index = title.indexOf(highlight);
  const before = title.slice(0, index);
  const after = title.slice(index + highlight.length);

  // Break sits in the "before" segment (e.g. "Telling Oman's " | Growth Story | Globally)
  if (breakAfter && before.includes(breakAfter)) {
    const breakAt = before.indexOf(breakAfter) + breakAfter.length;
    return (
      <>
        {before.slice(0, breakAt)}
        <br className={breakClassName} />
        {before.slice(breakAt)}
        <span className={highlightClassName}>{highlight}</span>
        {after}
      </>
    );
  }

  // Break after highlight into "after"
  if (breakAfter && `${before}${highlight}`.includes(breakAfter)) {
    return (
      <>
        {before}
        <span className={highlightClassName}>{highlight}</span>
        <br className={breakClassName} />
        {after.replace(/^\s+/, "")}
      </>
    );
  }

  return (
    <>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {renderWithBreak(after)}
    </>
  );
}
