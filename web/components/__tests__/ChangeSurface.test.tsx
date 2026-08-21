import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChangeSurface } from '../ChangeSurface';

const props = {
  intent: 'Give the payments service a read replica in eu-west-1',
  diff: '+ resource "aws_db_instance" "replica" {\n+   instance_class = "db.r6g.large"\n+ }',
  verdict: {
    state: 'halt' as const,
    label: 'Halted by policy',
    rule: 'tirith.data.residency.eu_only',
  },
  mergeTarget: 'payments-infra / main',
};

describe('ChangeSurface', () => {
  it('renders the diff inside a preformatted code element', () => {
    const { container } = render(<ChangeSurface {...props} />);
    const code = container.querySelector('pre > code');
    expect(code).not.toBeNull();
    expect(code!.textContent).toContain('aws_db_instance');
  });

  it('names the policy rule that produced the verdict', () => {
    render(<ChangeSurface {...props} />);
    expect(screen.getByText('tirith.data.residency.eu_only')).toBeInTheDocument();
  });

  it('conveys the verdict with text, not colour alone', () => {
    render(<ChangeSurface {...props} />);
    expect(screen.getByText('Halted by policy')).toBeInTheDocument();
  });
});
