import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import platform from '@/content/platform';
import { TwoPlanes } from '../TwoPlanes';

describe('TwoPlanes', () => {
  it('renders both plane labels and is no longer a stub', () => {
    render(<TwoPlanes content={platform.twoPlanes} />);

    expect(screen.getByText(platform.twoPlanes.deterministic.title)).toBeInTheDocument();
    expect(screen.getByText(platform.twoPlanes.agentic.title)).toBeInTheDocument();
    expect(document.querySelector('[data-stub="TwoPlanes"]')).toBeNull();
  });
});
