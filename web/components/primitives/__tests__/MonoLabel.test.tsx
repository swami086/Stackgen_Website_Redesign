import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MonoLabel } from '../MonoLabel';

describe('MonoLabel', () => {
  it('renders children inside an element using the mono font variable', () => {
    render(<MonoLabel>SECTION</MonoLabel>);
    const label = screen.getByText('SECTION');
    expect(label).toHaveClass('font-mono');
  });
});
