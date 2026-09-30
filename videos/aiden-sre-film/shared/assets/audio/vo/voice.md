# VO voice — CHOSEN

Chosen: River — Relaxed, Neutral, Informative
Voice ID: `SAz9YHcvj6GT2YYXdXww`

User gate U2 is closed on this voice. Eric and Sarah are rejected candidates.

Endpoint: ElevenLabs `text-to-speech` `convert_with_timestamps` (`/v1/text-to-speech/{voice_id}/with-timestamps`).

Settings (same as the L03 samples):

- model: `eleven_multilingual_v2`
- stability: `0.55`
- similarity: `0.75` (`similarity_boost`)
- style: `0.15`
- speaker boost: on
- output: `mp3_44100_128`, then 48 kHz `pcm_s24le` wav

| Slot | Name | Voice ID | Status | Sample |
|---|---|---|---|---|
| a | Eric — Smooth, Trustworthy | `cjVigY5qzO86Huf0OWal` | rejected | `samples/voice-a.mp3` |
| b | Sarah — Mature, Reassuring, Confident | `EXAVITQu4vr4xnSDxMaL` | rejected | `samples/voice-b.mp3` |
| c | River — Relaxed, Neutral, Informative | `SAz9YHcvj6GT2YYXdXww` | CHOSEN | `samples/voice-c.mp3` |

Why River: American, labeled calm and neutral, informative narration. Mid delivery for a technical-marketing read.

Rejected:

- Eric: American tenor, trustworthy, but less neutral than River.
- Sarah: confident and professional, warmer than the calm brief.
