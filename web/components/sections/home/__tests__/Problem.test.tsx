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
});
