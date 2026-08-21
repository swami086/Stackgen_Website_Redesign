import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { Problem } from '../Problem';

describe('Problem section', () => {
  it('renders the h2 from content', () => {
    render(<Problem content={home.problem} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      home.problem.heading,
    );
  });

  it('is no longer a stub', () => {
    const { container } = render(<Problem content={home.problem} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('keeps the live home citations visible in the rendered diagram', () => {
    const { container } = render(<Problem content={home.problem} />);
    const evidenceItems = container.querySelectorAll('[data-part="evidence-item"]');

    expect(evidenceItems).toHaveLength(home.problem.citations.length);
    expect(container).toHaveTextContent(home.problem.citations[0]!.source);
    expect(container).toHaveTextContent(home.problem.citations[1]!.source);
    expect(container).toHaveTextContent(home.problem.citations[2]!.source);
    expect(container).toHaveTextContent('Independent analysis found AI-authored pull requests carry more');
  });
});
