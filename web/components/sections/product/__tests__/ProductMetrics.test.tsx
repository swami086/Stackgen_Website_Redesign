import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import infrastructure from '@/content/product-infrastructure';
import { ProductMetrics } from '../ProductMetrics';

describe('ProductMetrics', () => {
  it('renders each metric value and label in compact ribbon layout', () => {
    render(<ProductMetrics content={infrastructure.metrics} />);
    for (const metric of infrastructure.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.queryByText(metric.mechanism)).not.toBeInTheDocument();
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<ProductMetrics content={infrastructure.metrics} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
