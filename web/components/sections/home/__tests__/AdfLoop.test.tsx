import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { AdfLoop } from '../AdfLoop';

describe('AdfLoop', () => {
  it('renders the section heading from content', () => {
    render(<AdfLoop content={home.adfLoop} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.adfLoop.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<AdfLoop content={home.adfLoop} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
