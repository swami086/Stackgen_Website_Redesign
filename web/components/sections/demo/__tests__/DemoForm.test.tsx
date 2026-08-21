import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DemoForm } from '../DemoForm';

describe('DemoForm', () => {
  it('labels every field visibly', () => {
    render(<DemoForm />);
    for (const label of ['Work email', 'Company', 'Role']) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it('reports a validation error without submitting', async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.click(screen.getByRole('button', { name: /request demo/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/work email/i);
  });

  it('states plainly that the prototype does not submit', async () => {
    const user = userEvent.setup();
    render(<DemoForm />);
    await user.type(screen.getByLabelText('Work email'), 'sre@example.com');
    await user.type(screen.getByLabelText('Company'), 'Example');
    await user.type(screen.getByLabelText('Role'), 'SRE');
    await user.click(screen.getByRole('button', { name: /request demo/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/prototype/i);
  });
});
