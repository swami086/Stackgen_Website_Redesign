import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { Mechanism } from '../sections/home/Mechanism';

describe('Mechanism', () => {
  it('renders the section heading', () => {
    render(<Mechanism content={home.mechanism} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.mechanism.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<Mechanism content={home.mechanism} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
