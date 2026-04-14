# Changelog

All notable changes to `@ds-mo/icons` are documented here.

---

## [0.2.0] — 2026-04-14

### Breaking changes

**13 icons renamed** — the `UI` suffix has been dropped to align with the updated Figma source. Update any existing imports accordingly.

| Old name | New name |
|---|---|
| `ArrowDownUI` | `ArrowDown` |
| `ArrowUpUI` | `ArrowUp` |
| `CheckDoubleUI` | `CheckDouble` |
| `CheckUI` | `Check` |
| `ChevronUpDownUI` | `ChevronUpDown` |
| `CrossUI` | `Cross` |
| `MinimizeUI` | `Minimize` |
| `PauseUI` | `Pause` |
| `PauseUIFilled` | `PauseFilled` |
| `VolumeMuteUI` | `VolumeMute` |
| `VolumeMuteUIFilled` | `VolumeMuteFilled` |
| `VolumeUI` | `Volume` |
| `VolumeUIFilled` | `VolumeFilled` |

### Updated

SVG paths updated for 9 icons (visual refresh from Figma):

- `AI`
- `ArrowDown` _(visual replaced by the former `ArrowDownUI` design — existing imports continue to work)_
- `ArrowUp` _(visual replaced by the former `ArrowUpUI` design — existing imports continue to work)_
- `Bell`
- `BellCircle`
- `BellExclamation`
- `BellRinging`
- `BellWifi`
- `Check` _(visual replaced by the former `CheckUI` design — existing imports continue to work)_

### Summary

377 icons total (previously 380).

---

## [0.1.0] — Initial release

- 380 SVG icons as tree-shakeable React components
- TypeScript definitions
- SVG sprite sheet
- GitHub Pages icon browser
