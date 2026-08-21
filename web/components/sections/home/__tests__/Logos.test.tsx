import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logos } from '../Logos';
import home from '@/content/home';
import { CUSTOMER_WORDMARKS } from '@/content/shared';

describe('Home Logos', () => {
  it('renders the eight canvas wordmarks as text', () => {
    render(<Logos content={home.logos} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(CUSTOMER_WORDMARKS.length);
    for (const name of CUSTOMER_WORDMARKS) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it('uses no images, so nothing can disappear against the dark strip', () => {
    const { container } = render(<Logos content={home.logos} />);
    expect(container.querySelectorAll('img')).toHaveLength(0);
  });

  it('names the remaining customers in the note line', () => {
    render(<Logos content={home.logos} />);
    expect(screen.getByText(home.logos.note)).toBeInTheDocument();
  });

  it('renders the credentials line', () => {
    render(<Logos content={home.logos} />);
    expect(screen.getByText(home.logos.heading)).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<Logos content={home.logos} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });

  it('keeps every wordmark in the tertiary token, never a raw hex', () => {
    render(<Logos content={home.logos} />);
    const list = screen.getAllByRole('listitem');
    for (const item of list) {
      expect(item.className).toContain('text-text-tertiary');
      expect(item.className).not.toMatch(/#[0-9a-f]{3,6}/i);
    }
    expect(within(list[0]).queryByRole('img')).toBeNull();
  });
});
