export function renderBoldText(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    const isBold = part.startsWith("**") && part.endsWith("**");

    if (isBold) {
      return (
        <strong
          key={index}
          className="font-semibold text-foreground"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}