import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InTheirWords } from '../InTheirWords';
import home from '@/content/home';

describe('In Their Words', () => {
  it('renders every quote as a blockquote', () => {
    const { container } = render(<InTheirWords content={home.inTheirWords} />);
    expect(container.querySelectorAll('blockquote')).toHaveLength(
      home.inTheirWords.quotes.length,
    );
  });

  it('visibly marks every placeholder quote', () => {
    const { container } = render(<InTheirWords content={home.inTheirWords} />);
    const blocks = Array.from(container.querySelectorAll('blockquote'));
    home.inTheirWords.quotes.forEach((quote, i) => {
      if (quote.status === 'placeholder') {
        expect(within(blocks[i] as HTMLElement).getByText(/PLACEHOLDER/)).toBeInTheDocument();
      }
    });
  });

  it('links published quotes to their source', () => {
    render(<InTheirWords content={home.inTheirWords} />);
    for (const quote of home.inTheirWords.quotes) {
      if (quote.status === 'published') {
        expect(screen.getByRole('link', { name: /source/i })).toHaveAttribute(
          'href',
          quote.sourceUrl,
        );
      }
    }
  });

  it('renders the section heading', () => {
    render(<InTheirWords content={home.inTheirWords} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.inTheirWords.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<InTheirWords content={home.inTheirWords} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
