import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { VideoFigure } from '../VideoFigure';

const props = {
  poster: '/product/greythr.webp',
  src: 'https://www.youtube.com/embed/V0zsWdJz2rs',
  label: 'greytHR on running SRE with Aiden',
  caption: 'Abhishek Gaurav, Head of Engineering and DevOps, greytHR.',
};

const syntheticSensitiveAccountId = ['1234', '5678', '9012'].join('');

describe('VideoFigure', () => {
  it('shows a poster and a play control before anything loads', () => {
    render(<VideoFigure {...props} />);
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('loads the player only after the visitor asks for it', async () => {
    render(<VideoFigure {...props} />);
    await userEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(document.querySelector('iframe')).not.toBeNull();
  });

  it('shows a visible caption for the long-form proof', () => {
    render(<VideoFigure {...props} />);
    expect(screen.getByText(props.caption)).toBeInTheDocument();
  });

  it('rejects sensitive identifiers through the redaction gate', () => {
    expect(() =>
      render(
        <VideoFigure
          {...props}
          label={`greytHR account ${syntheticSensitiveAccountId}`}
        />,
      ),
    ).toThrow(/sensitive identifier/i);
  });
});
