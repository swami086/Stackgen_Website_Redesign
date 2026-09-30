# VO voice — CANDIDATES (not chosen)

User gate U2 is open. None of these voices is selected.

Rendered line: L03 — "One failure can set off a flood of alerts."
Endpoint: ElevenLabs `text-to-speech` `convert_with_timestamps` (`/v1/text-to-speech/{voice_id}/with-timestamps`).
Samples (not committed): `shared/assets/audio/vo/samples/voice-{a,b,c}.mp3`.

Shared settings for all three:

- model: `eleven_multilingual_v2`
- stability: `0.55`
- similarity: `0.75` (`similarity_boost`)
- style: `0.15`
- speaker boost: on
- output: `mp3_44100_128`

| Slot | Name | Voice ID | Sample |
|---|---|---|---|
| a | Eric — Smooth, Trustworthy | `cjVigY5qzO86Huf0OWal` | `samples/voice-a.mp3` |
| b | Sarah — Mature, Reassuring, Confident | `EXAVITQu4vr4xnSDxMaL` | `samples/voice-b.mp3` |
| c | River — Relaxed, Neutral, Informative | `SAz9YHcvj6GT2YYXdXww` | `samples/voice-c.mp3` |

Why these three (calm, mid-pitch, neutral US, confident, technical-marketing):

- Eric: American, middle-aged, classy; described as a smooth tenor (mid pitch) and trustworthy. Confident without hype.
- Sarah: American, professional, confident, reassuring. Technical-marketing tone, warmer than a news read.
- River: American, labeled calm and neutral, informative narration. The calm end of the brief.

L01–L16 are not generated. No voice is locked.
