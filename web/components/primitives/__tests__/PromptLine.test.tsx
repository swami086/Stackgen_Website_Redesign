import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PromptLine } from '../PromptLine';

const prompt = 'scan my prod AWS account and do a security audit';

describe('PromptLine', () => {
  it('shows the prompt verbatim', () => {
    render(<PromptLine prompt={prompt} />);
    expect(screen.getByText(prompt)).toBeInTheDocument();
  });

  it('copies the prompt to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<PromptLine prompt={prompt} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(writeText).toHaveBeenCalledWith(prompt);
  });

  it('confirms the copy in text, not by colour alone', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<PromptLine prompt={prompt} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
});
