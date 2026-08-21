import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { AgenticOs } from '../AgenticOs';

describe('AgenticOs', () => {
  it('renders the section heading from content', () => {
    render(<AgenticOs content={home.agenticOs} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.agenticOs.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<AgenticOs content={home.agenticOs} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
