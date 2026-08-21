import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders an SVG with role img and accessible name StackGen', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'StackGen' })).toBeInTheDocument();
  });

  it('renders wordmark only by default', () => {
    const { container } = render(<Logo />);
    expect(container.querySelectorAll('path')).toHaveLength(8);
  });

  it('renders mark only when variant is mark', () => {
    const { container } = render(<Logo variant="mark" />);
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });
});
