import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import infrastructure from '@/content/product-infrastructure';
import automation from '@/content/product-automation';
import { ProductMechanism } from '../ProductMechanism';

describe('ProductMechanism', () => {
  it('renders the section heading from content', () => {
    render(<ProductMechanism content={infrastructure.mechanism} slug={infrastructure.slug} />);
    expect(
      screen.getByRole('heading', { level: 2, name: infrastructure.mechanism.heading }),
    ).toBeInTheDocument();
  });

  it('dispatches to the automation diagram by slug', () => {
    render(<ProductMechanism content={automation.mechanism} slug={automation.slug} />);
    expect(screen.getByRole('img', { name: 'Automation mechanism diagram' })).toBeInTheDocument();
  });

  it('is no longer a stub', () => {
    const { container } = render(
      <ProductMechanism content={infrastructure.mechanism} slug={infrastructure.slug} />,
    );
    expect(container.querySelector('[data-stub="ProductMechanism"]')).toBeNull();
  });
});
