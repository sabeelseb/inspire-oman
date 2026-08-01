export default function TitleHighlight({
  title,
  highlight,
}: {
  title: string;
  highlight?: string | null;
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
      <span className="gold-text">{highlight}</span>
      {after}
    </>
  );
}
