import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatBand } from '../StatBand';

const stats = [
  { value: '10×', label: 'provisioning velocity', mechanism: 'policy-checked Terraform from intent' },
  { value: '100%', label: 'policy-checked deploys', mechanism: 'Tirith evaluates every action boundary' },
];

describe('StatBand', () => {
  it('renders the figure as the heading', () => {
    render(<StatBand stats={stats} />);
    expect(screen.getByRole('heading', { name: '10×' })).toBeInTheDocument();
  });

  it('cites a mechanism for every metric, per Global Constraint 4', () => {
    render(<StatBand stats={stats} />);
    for (const s of stats) expect(screen.getByText(s.mechanism)).toBeInTheDocument();
  });

  it('uses tabular figures so columns align', () => {
    const { container } = render(<StatBand stats={stats} />);
    expect(container.querySelector('[data-part="figure"]')?.className).toContain('tabular-nums');
  });
});
