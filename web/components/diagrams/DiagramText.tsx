import type { SVGProps } from 'react';

// SVG <text> never wraps, but every canvas text node carries an explicit box
// width (e.g. 256x40 at 13px = two lines). Measuring needs no DOM so the wrap is
// identical on the server and the client.
// ponytail: advance widths are a per-character approximation of Inter rather
// than real font metrics — accurate to a few percent, which is enough to pick
// break points. Swap in opentype.js metrics if a line ever breaks a column.
const NARROW = new Set([...`iljItfr.,:;'"|!()[]{}·`]);
const WIDE = new Set([...'mwMW@']);

function advance(character: string): number {
  if (character === ' ') return 0.26;
  if (NARROW.has(character)) return 0.3;
  if (WIDE.has(character)) return 0.85;
  if (/[A-Z]/.test(character)) return 0.66;
  if (/[0-9]/.test(character)) return 0.57;
  return 0.53;
}

export function measureText(text: string, fontSize: number, mono = false): number {
  if (mono) return text.length * fontSize * 0.6;
  let ems = 0;
  for (const character of text) ems += advance(character);
  return ems * fontSize;
}

/** Shrink until the string plus an ellipsis fits, then append the ellipsis. */
function fitWithEllipsis(
  text: string,
  width: number,
  fontSize: number,
  mono: boolean,
): string {
  let out = text;
  while (out.length > 0 && measureText(`${out}…`, fontSize, mono) > width) {
    out = out.slice(0, -1);
  }
  return `${out.replace(/[\s.,;:-]+$/, '')}…`;
}

export function wrapText(
  text: string,
  width: number,
  fontSize = 13,
  mono = false,
  maxLines?: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  if (!width || width <= 0) return [words.join(' ')];

  const lines: string[] = [];
  let line = words[0];
  for (const word of words.slice(1)) {
    const candidate = `${line} ${word}`;
    if (measureText(candidate, fontSize, mono) <= width) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  lines.push(line);

  if (!maxLines || maxLines <= 0) return lines;

  // Canvas plates are sized for a fixed line count and SVG does not reflow, so
  // bounded copy is truncated rather than allowed to spill past its plate.
  const kept = lines.slice(0, maxLines);
  const last = kept.length - 1;
  const overflowed = lines.length > maxLines;
  if (overflowed || measureText(kept[last], fontSize, mono) > width) {
    kept[last] = fitWithEllipsis(kept[last], width, fontSize, mono);
  }
  return kept;
}

export type DiagramTextProps = Omit<
  SVGProps<SVGTextElement>,
  'children' | 'width' | 'x' | 'y'
> & {
  x: number;
  y: number;
  /** Canvas box width. Omit to render a single unwrapped line. */
  width?: number;
  lineHeight?: number;
  fontSize?: number;
  mono?: boolean;
  /** Line budget the surrounding plate tolerates. Copy beyond it is ellipsised. */
  maxLines?: number;
  children: string;
};

export function DiagramText({
  x,
  y,
  width,
  lineHeight,
  fontSize = 13,
  mono = false,
  maxLines,
  fontFamily,
  children,
  ...rest
}: DiagramTextProps) {
  const lines = width
    ? wrapText(children, width, fontSize, mono, maxLines)
    : [children];
  const step = lineHeight ?? Math.round(fontSize * 1.5);
  const truncated = lines.join(' ') !== children.split(/\s+/).filter(Boolean).join(' ');

  return (
    <text
      x={x}
      y={y}
      fontSize={fontSize}
      fontFamily={fontFamily ?? (mono ? 'var(--font-mono)' : 'var(--font-sans)')}
      aria-label={truncated ? children : undefined}
      {...rest}
    >
      {lines.map((line, index) => (
        <tspan key={line + index} x={x} dy={index === 0 ? 0 : step}>
          {line}
        </tspan>
      ))}
    </text>
  );
}
