import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Integrations } from '../Integrations';
import home from '@/content/home';

describe('Home Integrations', () => {
  it('renders all seven canvas categories with their subtitles', () => {
    render(<Integrations content={home.integrations} />);
    expect(home.integrationCategories).toHaveLength(7);
    for (const category of home.integrationCategories) {
      expect(screen.getByText(category.label)).toBeInTheDocument();
      expect(screen.getByText(category.subtitle)).toBeInTheDocument();
    }
  });

  it('renders every tool as a text wordmark', () => {
    render(<Integrations content={home.integrations} />);
    const tools = home.integrationCategories.flatMap((c) => c.tools);
    expect(tools.length).toBeGreaterThan(30);
    for (const tool of tools) {
      expect(screen.getByText(tool)).toBeInTheDocument();
    }
  });

  it('uses no brand images, which would render black on the dark section', () => {
    const { container } = render(<Integrations content={home.integrations} />);
    expect(container.querySelectorAll('img')).toHaveLength(0);
  });

  it('renders the section heading and deck from content', () => {
    render(<Integrations content={home.integrations} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.integrations.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(home.integrations.deck)).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<Integrations content={home.integrations} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
