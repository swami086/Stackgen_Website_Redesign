import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AidenOsDiagram } from '../AidenOsDiagram';

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
