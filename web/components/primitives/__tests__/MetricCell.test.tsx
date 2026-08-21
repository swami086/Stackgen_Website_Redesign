import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MetricCell } from '../MetricCell';

describe('MetricCell', () => {
  it('renders value, label, and mechanism', () => {
    render(
      <MetricCell
        metric={{
          value: '10x',
          label: 'Faster deployments',
          mechanism: 'Aiden automates Terraform plan review',
        }}
      />,
    );

    expect(screen.getByText('10x')).toBeInTheDocument();
    expect(screen.getByText('Faster deployments')).toBeInTheDocument();
    expect(
      screen.getByText('Aiden automates Terraform plan review'),
    ).toBeInTheDocument();
  });
});
