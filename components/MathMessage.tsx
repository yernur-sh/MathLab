import katex from "katex";

const mathParts = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$\n]+\$)/g;

function plainText(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/```(?:latex|math)?/gi, "")
    .replace(/^\s*#{1,6}\s+/gm, "");
}

export default function MathMessage({ content }: { content: string }) {
  return <>
    {content.split(mathParts).map((part, index) => {
      const display = part.startsWith("$$") || part.startsWith("\\[");
      const inline = part.startsWith("\\(") || (part.startsWith("$") && !display);
      if (!display && !inline) return <span key={index}>{plainText(part)}</span>;

      const expression = part.startsWith("$") && !display ? part.slice(1, -1) : part.slice(2, -2);
      try {
        const html = katex.renderToString(expression.trim(), { displayMode: display, throwOnError: true, trust: false, output: "htmlAndMathml" });
        return display
          ? <div key={index} className="my-2 max-w-full overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />
          : <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span key={index}>{plainText(expression)}</span>;
      }
    })}
  </>;
}
