# Task 6 Redaction Sign-off

## Status

- `blocked`
- `home-audit` and the featured-case poster are cleared.
- The full Task 6 media set is not cleared yet.
- The next required clip, `home-automation`, still fails the 30fps gate.

## Cleared assets

### `home-audit`

- source video: `i31kMgVn_Xk` (`Auto-Generate Compliance and Security Audits`)
- timecodes: `00:10-00:18`
- scan command: `cd web && node scripts/clips.mjs --only home-audit`
- frame scan result: `240` frames scanned, `0` hits from `findSensitive`
- outputs:
  - `web/public/product/home-audit.webm`
  - `web/public/product/home-audit.mp4`
  - `web/public/product/home-audit.webp`

### `greythr`

- source video: `V0zsWdJz2rs` (`The Future of AI in SRE with Abhishek Gaurav from GreytHR`)
- timecode: `01:52`
- scan command: `cd web && node scripts/clips.mjs --only home-audit,greythr`
- frame scan result: `1` frame scanned, `0` hits from `findSensitive`
- output:
  - `web/public/product/greythr.webp`

## Rejected / incomplete

- `home-audit` candidate `00:44-00:52` rejected on `frame-00060.png` with `infra-resource`
- `home-automation` candidate `00:20-00:28` rejected on `frame-00002.png` with `aws-account-id`
- Remaining clips are not signed off
