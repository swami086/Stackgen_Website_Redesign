import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeaderSplit } from '../SectionHeaderSplit';

describe('SectionHeaderSplit', () => {
  it('renders the heading as a heading element and the label as text', () => {
    render(
      <SectionHeaderSplit
        label="Mechanism"
        heading="How it works"
        body="Supporting copy"
      />,
    );

    expect(screen.getByText('Mechanism')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'How it works' }),
    ).toBeInTheDocument();
  });
});
