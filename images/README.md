# Silent Cue — Image Assets

Save your images in this folder with **exactly** these filenames.
The website HTML already references them by name.

---

## Your AI-Generated Images (Required)

| Filename | Image to Save | Used In |
|---|---|---|
| `narrator.jpg` | The 8-ball character in pinstripe suit, finger to lips, at the table | Hero section (right side), Narrator section |
| `action-1.jpg` | Close-up shot: the character bent over the table addressing the cue ball | Archive featured card, Gallery strip panel 1 |
| `action-2.jpg` | Character leaning over table — jazz band visible in background | Gallery strip panel 2 |
| `action-3.jpg` | Wide shot — character at table, full pool hall visible | Gallery strip panel 3 |
| `action-4.jpg` | Character standing upright at table, crowd behind | Gallery strip panel 4 |
| `diagram-golden-zone.jpg` | The "GOLDEN ZONE" table diagram | Strategy Diagrams section |
| `diagram-dead-zone.jpg` | The "DEAD ZONE" table diagram | Strategy Diagrams section |
| `diagram-english-guide.jpg` | The ball control / English spin guide | Ball Control / Technique section |

---

## File Format Notes

- **Format**: JPG or WEBP preferred (smaller file size)
- **Resolution**: Save at full resolution — the site will scale them down
- **Naming**: Lowercase, hyphens only, no spaces. Exactly as shown above.

---

## How to Add the Images to the Repo

Once you've saved the files into this folder with the correct names, run:

```bash
cd Silent-cue-pool-school.-
git add images/
git commit -m "feat: add brand imagery and character assets"
git push origin claude/silent-cue-brand-Jblgj
```

---

## The 4 Action Shots — How to Crop Them

You shared a single image with a 2×2 grid of 4 action shots. To use them individually:
1. Open the grid image in any photo editor
2. Crop each quadrant to its own file:
   - **Top-left** → `action-1.jpg`
   - **Top-right** → `action-2.jpg`
   - **Bottom-left** → `action-3.jpg`
   - **Bottom-right** → `action-4.jpg`

Or save the full grid as a single image and use it in the gallery — just name it `action-1.jpg` and it will display full-width.
