import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CaseMetrics } from '../CaseMetrics';
import greythr from '@/content/case-greythr';

describe('CaseMetrics', () => {
  it('renders every metric value from content', () => {
    render(<CaseMetrics content={greythr.metrics} />);
    for (const metric of greythr.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<CaseMetrics content={greythr.metrics} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
