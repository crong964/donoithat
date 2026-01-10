const HighlightedText = ({
  mainText,
  requireText,
}: {
  mainText: string;
  requireText: string;
}) => {
  const main = mainText.replaceAll(
    requireText,
    `<strong style="background-color: red;color: white; padding:0 1px" >${requireText}</strong>`
  );
  if (requireText.trim().length <= 0) {
    return <p className="text-sm text-left pl-3">{mainText}</p>;
  }
  return (
    <p
      className="text-sm text-left pl-3"
      dangerouslySetInnerHTML={{
        __html: main,
      }}
    />
  );
};
export default HighlightedText;
