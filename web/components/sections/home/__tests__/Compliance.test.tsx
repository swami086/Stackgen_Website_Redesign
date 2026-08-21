import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Compliance } from '../Compliance';
import home from '@/content/home';

describe('Compliance', () => {
  it('renders every badge from content', () => {
    render(<Compliance content={home.compliance} />);
    for (const badge of home.compliance.badges) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });

  it('renders the section heading', () => {
    render(<Compliance content={home.compliance} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.compliance.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<Compliance content={home.compliance} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
