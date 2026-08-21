import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DiagramText, measureText, wrapText } from '../DiagramText';

describe('wrapText', () => {
  it('keeps short copy on a single line', () => {
    expect(wrapText('Intent', 256, 13)).toEqual(['Intent']);
  });

  it('wraps canvas body copy to the canvas box width', () => {
    // Canvas factory-process step body: box is 256x40 at 13px, i.e. two lines.
    const lines = wrapText(
      'Reviewable spec: agents, OCG data, SLOs, escalation boundaries.',
      256,
      13,
    );
    expect(lines.length).toBe(2);
    expect(lines.join(' ')).toBe(
      'Reviewable spec: agents, OCG data, SLOs, escalation boundaries.',
    );
  });

  it('never emits a line wider than the box', () => {
    const width = 200;
    const lines = wrapText(
      'Aiden ties the anomaly to infrastructure state and recent change history.',
      width,
      13,
    );
    for (const line of lines) {
      expect(line.length * 13 * 0.62).toBeLessThanOrEqual(width * 1.35);
    }
  });

  it('does not drop or duplicate words', () => {
    const copy = 'Outcomes write back to the OCG and improve the next cycle.';
    expect(wrapText(copy, 256, 13).join(' ')).toBe(copy);
  });

  it('leaves a single overlong word intact rather than truncating it', () => {
    expect(wrapText('supercalifragilisticexpialidocious', 40, 13)).toEqual([
      'supercalifragilisticexpialidocious',
    ]);
  });
});

// R11: canvas plates are sized for a fixed line count, but translations run
// 30-40% longer and SVG does not reflow. Copy must be bounded, not spill.
describe('wrapText line bounding', () => {
  const long =
    'Aiden ties the anomaly to infrastructure state and the last approved change, then hands the incident to SRE with the evidence already assembled.';

  it('never returns more lines than the bound allows', () => {
    expect(wrapText(long, 244, 12, false, 2)).toHaveLength(2);
  });

  it('marks bounded copy with an ellipsis so truncation is visible', () => {
    const lines = wrapText(long, 244, 12, false, 2);
    expect(lines[1].endsWith('…')).toBe(true);
  });

  it('keeps the ellipsised final line inside the box width', () => {
    const width = 244;
    const lines = wrapText(long, width, 12, false, 2);
    expect(measureText(lines[1], 12)).toBeLessThanOrEqual(width);
  });

  it('leaves copy untouched when it already fits inside the bound', () => {
    const short = 'Signals align with the live estate.';
    expect(wrapText(short, 244, 12, false, 3)).toEqual(wrapText(short, 244, 12));
  });

  it('truncates an overlong identifier rather than overflowing the plate', () => {
    const lines = wrapText('stackgen-terraform-state-bucket-a928b57', 80, 12, true, 1);
    expect(lines).toHaveLength(1);
    expect(lines[0].endsWith('…')).toBe(true);
    expect(measureText(lines[0], 12, true)).toBeLessThanOrEqual(80);
  });
});

describe('DiagramText line bounding', () => {
  it('renders no more tspans than the bound allows', () => {
    const { container } = render(
      <svg>
        <DiagramText x={0} y={0} width={244} fontSize={12} maxLines={2}>
          Aiden ties the anomaly to infrastructure state and the last approved change,
          then hands the incident to SRE with the evidence already assembled.
        </DiagramText>
      </svg>,
    );
    expect(container.querySelectorAll('tspan')).toHaveLength(2);
  });

  it('exposes the full untruncated copy to assistive technology', () => {
    const full = 'Aiden ties the anomaly to infrastructure state and the last approved change.';
    const { container } = render(
      <svg>
        <DiagramText x={0} y={0} width={120} fontSize={12} maxLines={1}>
          {full}
        </DiagramText>
      </svg>,
    );
    expect(container.querySelector('text')?.getAttribute('aria-label')).toBe(full);
  });
});

describe('DiagramText', () => {
  it('renders one tspan per wrapped line, all sharing the anchor x', () => {
    const { container } = render(
      <svg>
        <DiagramText x={100} y={50} width={256} fontSize={13}>
          Reviewable spec: agents, OCG data, SLOs, escalation boundaries.
        </DiagramText>
      </svg>,
    );
    const tspans = container.querySelectorAll('tspan');
    expect(tspans.length).toBe(2);
    tspans.forEach((t) => expect(t.getAttribute('x')).toBe('100'));
  });

  it('offsets each continuation line by the line height', () => {
    const { container } = render(
      <svg>
        <DiagramText x={0} y={0} width={256} fontSize={13} lineHeight={20}>
          Reviewable spec: agents, OCG data, SLOs, escalation boundaries.
        </DiagramText>
      </svg>,
    );
    const tspans = [...container.querySelectorAll('tspan')];
    expect(tspans[0].getAttribute('dy')).toBe('0');
    expect(tspans[1].getAttribute('dy')).toBe('20');
  });

  it('renders a plain single line when no width is given', () => {
    const { container } = render(
      <svg>
        <DiagramText x={0} y={0} fontSize={13}>
          Some long copy that would otherwise wrap if a width were supplied here
        </DiagramText>
      </svg>,
    );
    expect(container.querySelectorAll('tspan').length).toBe(1);
  });

  it('forwards motion hooks to the text element', () => {
    const { container } = render(
      <svg>
        <DiagramText x={0} y={0} width={200} data-part="body" data-index={2}>
          Wrapped body copy for the diagram card goes here and wraps
        </DiagramText>
      </svg>,
    );
    const text = container.querySelector('text')!;
    expect(text.getAttribute('data-part')).toBe('body');
    expect(text.getAttribute('data-index')).toBe('2');
  });
});
