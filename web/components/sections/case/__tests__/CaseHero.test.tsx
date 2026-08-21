import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CaseHero } from '../CaseHero';
import greythr from '@/content/case-greythr';
import innovaccer from '@/content/case-innovaccer';
import caseIndex from '@/content/case-index';

describe('CaseHero', () => {
  it('attributes and sources the published greytHR quote', () => {
    render(<CaseHero content={greythr.hero} />);
    expect(screen.getByText(/Abhishek Gaurav/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source/i })).toHaveAttribute(
      'href',
      'https://stackgen.com/case-studies/greythr',
    );
  });

  it('renders Innovaccer without a named quote', () => {
    const { container } = render(<CaseHero content={innovaccer.hero} />);
    expect(container.querySelector('blockquote')).toBeNull();
  });

  it('renders the h1 from content', () => {
    render(<CaseHero content={caseIndex.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(caseIndex.hero.h1);
  });

  it('is no longer a stub', () => {
    const { container } = render(<CaseHero content={greythr.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
