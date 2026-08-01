export default function TitleHighlight({
  title,
  highlight,
  highlightClassName = "gold-text",
}: {
  title: string;
  highlight?: string | null;
  highlightClassName?: string;
}) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }

  const index = title.indexOf(highlight);
  const before = title.slice(0, index);
  const after = title.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {after}
    </>
  );
}
