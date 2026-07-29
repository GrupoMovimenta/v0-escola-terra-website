import { ReactNode } from "react";

export function renderBoldText(text: string): ReactNode[] {
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

export function renderFormattedContent(content: string): ReactNode[] {
  const blocks = content
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isList = lines.every((line) => line.startsWith("- "));

    if (isList) {
      return (
        <ul
          key={blockIndex}
          className="mb-4 space-y-1 text-muted-foreground"
        >
          {lines.map((line, lineIndex) => (
            <li
              key={lineIndex}
              className="flex items-start gap-2 leading-relaxed"
            >
              <span aria-hidden="true">-</span>

              <span>
                {renderBoldText(line.slice(2))}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={blockIndex}
        className="mb-4 text-muted-foreground leading-relaxed"
      >
        {renderBoldText(lines.join(" "))}
      </p>
    );
  });
}