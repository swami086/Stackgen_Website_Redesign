import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { OperationalContextGraphSection } from '../OperationalContextGraphSection';

describe('OperationalContextGraphSection', () => {
  it('renders the section heading from content', () => {
    render(<OperationalContextGraphSection content={home.contextGraph} />);
    expect(
      screen.getByRole('heading', { level: 2, name: home.contextGraph.heading }),
    ).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(
      <OperationalContextGraphSection content={home.contextGraph} />,
    );
    expect(container.querySelector('[data-stub]')).toBeNull();
  });
});
