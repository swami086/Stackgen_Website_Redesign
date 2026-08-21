import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AidenOsDiagram } from '../AidenOsDiagram';

const LEFT_FRAME_ASSET_PATH = resolve(process.cwd(), 'public/diagram-assets/aiden-os-left-side-frame.svg');
const FIGMA_LEFT_FRAME = {
  width: 129.8968288977885,
  height: 551.0742244279696,
};

function readSvgNumber(markup: string, attribute: string) {
  const match = markup.match(new RegExp(`${attribute}="([0-9.]+)"`));
  if (!match) {
    throw new Error(`Missing ${attribute} in test SVG`);
  }
  return Number(match[1]);
}

function readViewBox(markup: string) {
  const match = markup.match(/viewBox="([^"]+)"/);
  if (!match) {
    throw new Error('Missing viewBox in test SVG');
  }
  return match[1].split(/\s+/).map(Number);
}

describe('AidenOsDiagram', () => {
  it('exposes an accessible name through its title', () => {
    const { container } = render(<AidenOsDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const labelledBy = svg.getAttribute('aria-labelledby')!;
    const [titleId] = labelledBy.split(' ');
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(8);
  });

  it('renders labels as real SVG text, never paths', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('uses no banned product name', () => {
    const { container } = render(<AidenOsDiagram />);
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/Aiden for DevOps|InfraOps|Olly/);
  });

  it('renders the exact five Aiden OS capability cards', () => {
    render(<AidenOsDiagram />);
    expect(screen.getByText('Workflow Orchestration')).toBeInTheDocument();
    expect(screen.getByText('Cost Governance')).toBeInTheDocument();
    expect(screen.getByText('Model Routing')).toBeInTheDocument();
    expect(screen.getByText('Event Messaging')).toBeInTheDocument();
    expect(screen.getByText('Policy Enforcement')).toBeInTheDocument();
  });

  it('sets the diagram on a panel ground', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelector('svg')).toHaveAttribute('data-ground', 'panel');
    expect(container.querySelector('[data-part="panel-ground"]')).not.toBeNull();
  });

  it('renders the exact left-side frame assets from Figma', () => {
    const { container } = render(<AidenOsDiagram />);
    const imageHrefs = [...container.querySelectorAll('image')].map((node) => node.getAttribute('href'));
    const leftFrame = container.querySelector('[data-part="visual-left-frame"]');

    expect(imageHrefs).toContain('/diagram-assets/aiden-os-center.svg');
    expect(imageHrefs).toContain('/diagram-assets/aiden-os-left-top-frame.svg');
    expect(imageHrefs).toContain('/diagram-assets/aiden-os-left-side-frame.svg');
    expect(container.querySelector('[data-part="visual-top-frame"]')).not.toBeNull();
    expect(leftFrame).not.toBeNull();
    expect(leftFrame).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
  });

  it('keeps the left-side frame asset portrait and aligned to the Figma slot ratio', () => {
    const markup = readFileSync(LEFT_FRAME_ASSET_PATH, 'utf8');
    const width = readSvgNumber(markup, 'width');
    const height = readSvgNumber(markup, 'height');
    const [, , viewBoxWidth, viewBoxHeight] = readViewBox(markup);
    const figmaAspect = FIGMA_LEFT_FRAME.width / FIGMA_LEFT_FRAME.height;

    expect(width).toBeLessThan(height);
    expect(viewBoxWidth).toBeLessThan(viewBoxHeight);
    expect(width).toBeCloseTo(FIGMA_LEFT_FRAME.width, 3);
    expect(height).toBeCloseTo(FIGMA_LEFT_FRAME.height, 3);
    expect(width / height).toBeCloseTo(figmaAspect, 5);
    expect(viewBoxWidth / viewBoxHeight).toBeCloseTo(figmaAspect, 5);
  });

  it('bounds every wrapped block so translated copy cannot overflow its plate', () => {
    const { container } = render(<AidenOsDiagram />);
    const wrapped = [...container.querySelectorAll('text')].filter(
      (node) => node.querySelectorAll('tspan').length > 1,
    );
    expect(wrapped.length).toBeGreaterThan(0);
    for (const node of wrapped) {
      expect(node.querySelectorAll('tspan').length).toBeLessThanOrEqual(4);
    }
  });

  it('preserves the deck frame viewBox', () => {
    const { container } = render(<AidenOsDiagram />);
    expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 1920 1080');
  });
});
