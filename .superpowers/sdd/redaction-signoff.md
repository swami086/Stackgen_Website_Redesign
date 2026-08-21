# Task 6 Redaction Sign-off

## Status

- `blocked`
- `home-audit`, `home-automation`, and the featured-case poster are cleared.
- The full Task 6 media set is not cleared yet.
- The remaining planned clip segments still need exact 30fps gate evidence.

## Cleared assets

### `home-audit`

- source video: `i31kMgVn_Xk` (`Auto-Generate Compliance and Security Audits`)
- timecodes: `00:10-00:18`
- scan command: `cd web && node scripts/clips.mjs --only home-audit`
- frame scan result: `240` frames scanned, `0` hits from `findSensitive`
- dimensions / fps:
  - clip: `1440x860 @ 30fps`
  - poster: `1440x860`
- byte sizes:
  - `home-audit.webm`: `88360`
  - `home-audit.mp4`: `46185`
  - `home-audit.webp`: `21402`
- outputs:
  - `web/public/product/home-audit.webm`
  - `web/public/product/home-audit.mp4`
  - `web/public/product/home-audit.webp`

### `home-automation`

- source video: `HKEV6rkRDzU` (`Approval and Auto Remediation Flow`)
- timecodes: `00:24-00:32`
- scan command: `cd web && node scripts/clips.mjs --only home-automation`
- frame scan result: `240` frames scanned, `0` hits from `findSensitive`
- dimensions / fps:
  - clip: `1440x860 @ 30fps`
  - poster: `1440x860`
- byte sizes:
  - `home-automation.webm`: `387958`
  - `home-automation.mp4`: `269899`
  - `home-automation.webp`: `58458`
- outputs:
  - `web/public/product/home-automation.webm`
  - `web/public/product/home-automation.mp4`
  - `web/public/product/home-automation.webp`

### `greythr`

- source video: `V0zsWdJz2rs` (`The Future of AI in SRE with Abhishek Gaurav from GreytHR`)
- timecode: `01:52`
- scan command: `cd web && node scripts/clips.mjs --only greythr`
- frame scan result: `1` frame scanned, `0` hits from `findSensitive`
- dimensions:
  - poster: `1440x810`
- byte sizes:
  - `greythr.webp`: `64772`
- outputs:
  - `web/public/product/greythr.webp`

## Rejected / incomplete

- `home-audit` candidate `00:44-00:52` rejected on `frame-00060.png` with `infra-resource`
- `home-automation` candidate `00:20-00:28` rejected on `frame-00002.png` with `aws-account-id`
- Remaining planned clip segments are still unsigned:
  - `home-infrastructure`
  - `home-observability`
  - `sre-01`
  - `sre-02`
  - `sre-03`
  - `automation-01`
  - `automation-02`
  - `automation-03`
  - `infrastructure-01`
  - `infrastructure-02`
  - `infrastructure-03`
  - `observability-01`
  - `observability-02`
  - `observability-03`
