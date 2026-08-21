import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import home from '@/content/home';
import { FactoryProcess } from '../FactoryProcess';

describe('FactoryProcess', () => {
  it('renders the section heading and is no longer a stub', () => {
    render(<FactoryProcess content={home.factoryProcess} />);

    expect(
      screen.getByRole('heading', { level: 2, name: home.factoryProcess.heading }),
    ).toBeInTheDocument();
    expect(document.querySelector('[data-stub="FactoryProcess"]')).toBeNull();
  });
});
