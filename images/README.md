# Silent Cue — Image Assets

Save your images in this folder with **exactly** these filenames.
The website HTML already references them by name.

---

## Character Images

| Filename | Image | Used In |
|---|---|---|
| `narrator.jpg` | 8-ball character, finger to lips, seated at table | Hero section, Narrator section |
| `action-1.jpg` | Close-up shot: character bent over, addressing cue ball | Archive featured card, Gallery panel 1 |
| `action-2.jpg` | Character leaning over table — jazz band in background | Gallery panel 2 |
| `action-3.jpg` | Wide shot — full pool hall visible | Gallery panel 3 |
| `action-4.jpg` | Character standing upright at table, crowd behind | Gallery panel 4, Archive card hero |

---

## Diagrams

| Filename | Image | Used In |
|---|---|---|
| `diagram-golden-zone.jpg` | "GOLDEN ZONE" table diagram | Strategy Diagrams section |
| `diagram-dead-zone.jpg` | "DEAD ZONE" table diagram | Strategy Diagrams section |
| `diagram-english-guide.jpg` | Full English spin guide (overhead view) | Ball Control / Technique section |
| `diagram-cue-ball-contact.jpg` | Close-up cue ball showing Top Follow / Bottom Draw / Left / Right / Center | Article: The Contact Point |
| `diagram-mindset.jpg` | Narrator at table — Pre-Shot Routine / Mindset / Psychological Dominance / Confidence & Stress map | Article: The Mindset Map |
| `diagram-table-mapping.jpg` | Overhead table — Coordinate Grid / Target Pocket Mapping / Optimal Positioning Zone | Article: Table Mapping |
| `diagram-stance.jpg` | Narrator with full stance breakdown — Power / Alignment / Balance / Consistency graphs | Article: The Foundation |

---

## Naming Rules
- Lowercase, hyphens only, no spaces
- JPG or WEBP preferred
- Save at full resolution — the site scales them

## 4-Panel Action Grid
If you want each panel separately, crop the 2×2 grid:
- Top-left → `action-1.jpg`
- Top-right → `action-2.jpg`
- Bottom-left → `action-3.jpg`
- Bottom-right → `action-4.jpg`

Or save the full grid as `action-1.jpg` and it fills the gallery slot.

## Pushing Images to the Repo
```bash
git add images/
git commit -m "feat: add brand imagery"
git push origin main
```
