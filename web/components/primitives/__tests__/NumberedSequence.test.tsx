import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NumberedSequence } from '../NumberedSequence';

const items = [
  { title: 'Intent', body: 'State the operational outcome in plain language.' },
  { title: 'Factory Spec', body: 'A reviewable spec defines agents and boundaries.' },
  { title: 'Factory Runtime', body: 'Agents execute; novel cases escalate to humans.' },
];

describe('NumberedSequence', () => {
  it('numbers every item from 01 with a leading zero', () => {
    render(<NumberedSequence items={items} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('renders each title and body', () => {
    render(<NumberedSequence items={items} />);
    for (const i of items) {
      expect(screen.getByText(i.title)).toBeInTheDocument();
      expect(screen.getByText(i.body)).toBeInTheDocument();
    }
  });

  it('marks the numbers decorative, because the titles carry the meaning', () => {
    const { container } = render(<NumberedSequence items={items} />);
    expect(container.querySelector('[data-part="index"]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('exposes the sequence as a list', () => {
    render(<NumberedSequence items={items} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
