import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Reveal } from '../Reveal';

describe('Reveal', () => {
  it('renders children without adding a wrapper element', () => {
    const { container } = render(
      <Reveal>
        <p>visible content</p>
      </Reveal>,
    );
    expect(screen.getByText('visible content')).toBeInTheDocument();
    expect(container.firstElementChild?.tagName).toBe('P');
  });
});
