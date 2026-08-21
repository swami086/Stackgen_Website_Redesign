import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DemoHero } from '../DemoHero';
import scheduleDemo from '@/content/schedule-demo';

describe('DemoHero', () => {
  it('renders the h1 from content', () => {
    render(<DemoHero content={scheduleDemo.hero} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(scheduleDemo.hero.h1);
  });

  it('renders supporting copy from content', () => {
    render(<DemoHero content={scheduleDemo.hero} />);
    expect(screen.getByText(scheduleDemo.hero.sub)).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(<DemoHero content={scheduleDemo.hero} />);
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
