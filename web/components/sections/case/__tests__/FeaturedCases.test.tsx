import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeaturedCases } from '../FeaturedCases';
import caseIndex from '@/content/case-index';

describe('FeaturedCases', () => {
  it('links to both case study routes', () => {
    render(<FeaturedCases content={caseIndex.cases} />);
    expect(screen.getByRole('link', { name: /greytHR/i })).toHaveAttribute(
      'href',
      '/case-studies/greythr',
    );
    expect(screen.getByRole('link', { name: /Innovaccer/i })).toHaveAttribute(
      'href',
      '/case-studies/innovaccer',
    );
  });

  it('renders each case summary from content', () => {
    render(<FeaturedCases content={caseIndex.cases} />);
    for (const item of caseIndex.cases) {
      expect(screen.getByText(item.summary)).toBeInTheDocument();
    }
  });

  it('is no longer a stub', () => {
    const { container } = render(<FeaturedCases content={caseIndex.cases} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
