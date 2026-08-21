import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AidenOsLinksDiagram } from '../AidenOsLinksDiagram';

describe('AidenOsLinksDiagram', () => {
  it('exposes an accessible name via title', () => {
    const { container } = render(<AidenOsLinksDiagram />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    const titleId = svg.getAttribute('aria-labelledby')!;
    expect(container.querySelector(`#${titleId}`)?.textContent).toBeTruthy();
  });

  it('describes the flow for screen readers', () => {
    const { container } = render(<AidenOsLinksDiagram />);
    expect(container.querySelector('desc')?.textContent?.length ?? 0).toBeGreaterThan(40);
  });

  it('carries motion hooks on every animatable part', () => {
    const { container } = render(<AidenOsLinksDiagram />);
    expect(container.querySelectorAll('[data-part]').length).toBeGreaterThan(2);
  });

  it('renders diagram labels as real SVG text, not paths', () => {
    const { container } = render(<AidenOsLinksDiagram />);
    expect(container.querySelectorAll('text').length).toBeGreaterThan(0);
  });

  it('is no longer a stub', () => {
    const { container } = render(<AidenOsLinksDiagram />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('preserves the legacy content props instead of acting as import-path-only compatibility', () => {
    render(
      <AidenOsLinksDiagram
        aidenOs={{
          label: 'CUSTOM OS',
          heading: 'Control layer heading',
          body: 'Distinctive body copy for the legacy wrapper contract.',
          features: [
            {
              title: 'Escalation lattice',
              body: 'Routes exceptions back to humans with the audit trail attached.',
            },
            {
              title: 'Spend policy',
              body: 'Distinctive cost boundary text that should stay visible.',
            },
          ],
          roadmap: {
            label: 'Launch ladder',
            note: 'Unique roadmap note for regression coverage.',
            items: ['Now: Control layer', 'Next: Migration guardrails', 'Later: Multi-model ops'],
          },
        }}
        productLinks={{
          heading: 'Distinct surfaces heading',
          products: [
            { name: 'Custom infrastructure route', href: '/product/custom-infra' },
            { name: 'Custom automation route', href: '/product/custom-automation' },
            { name: 'Custom observability route', href: '/product/custom-observability' },
            { name: 'Custom sre route', href: '/product/custom-sre' },
          ],
        }}
      />,
    );

    expect(screen.getByText('Control layer heading')).toBeInTheDocument();
    expect(
      screen.getByText('Distinctive body copy for the legacy wrapper contract.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Escalation lattice')).toBeInTheDocument();
    expect(screen.getByText('Spend policy')).toBeInTheDocument();
    expect(screen.getByText('Launch ladder')).toBeInTheDocument();
    expect(screen.getByText('Unique roadmap note for regression coverage.')).toBeInTheDocument();
    expect(screen.getByText('Custom infrastructure route')).toBeInTheDocument();
    expect(screen.getByText('Distinct surfaces heading')).toBeInTheDocument();
  });
});
