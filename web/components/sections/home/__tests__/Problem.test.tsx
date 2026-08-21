import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { Problem } from '../Problem';

const customCitations: typeof home.problem.citations = [
  {
    claim: 'Custom forwarding proof claim alpha.',
    source: 'Forwarding source alpha',
  },
  {
    claim: 'Custom forwarding proof claim beta.',
    source: 'Forwarding source beta',
  },
  {
    claim: 'Custom forwarding proof claim gamma.',
    source: 'Forwarding source gamma',
  },
];

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
    const content = {
      ...home.problem,
      citations: customCitations,
    };
    const { container } = render(<Problem content={content} />);
    const evidenceItems = container.querySelectorAll('[data-part="evidence-item"]');

    expect(evidenceItems).toHaveLength(customCitations.length);
    expect(container).toHaveTextContent(customCitations[0]!.source);
    expect(container).toHaveTextContent(customCitations[1]!.source);
    expect(container).toHaveTextContent(customCitations[2]!.source);
    expect(container).toHaveTextContent(customCitations[0]!.claim);
    expect(container).toHaveTextContent(customCitations[1]!.claim);
    expect(container).toHaveTextContent(customCitations[2]!.claim);
    expect(container).not.toHaveTextContent(home.problem.citations[0]!.source);
  });
});
