# VO voice — CHOSEN

Chosen: Bryan — Charismatic & Professional
Voice ID: `bPMKpgEe88vKSwusXTMU`

Replaced Jimmy (`Ntx0GnBiEPjRS1PkJ0EA`, eleven_v3, calm conversational) on 2026-10-01. Jimmy takes are in `jimmy/`. River takes are in `river/`. Bryan is eleven_v3, American, confident product-film delivery. Script text is unchanged. Word timings are whisper-aligned to the locked script.

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
