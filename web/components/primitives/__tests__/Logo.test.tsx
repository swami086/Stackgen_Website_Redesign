import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders an SVG with role img and accessible name StackGen', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'StackGen' })).toBeInTheDocument();
  });
});
