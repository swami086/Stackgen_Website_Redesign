# StackGen website — content editor quick start

You can edit the live website's text without any code or deploy. Changes go
live within about 5 minutes of saving.

## Login

1. Go to **http://34.143.68.214:3000/admin/login**
2. Sign in with your email + password
3. Forgot your password? Use **Forgot password** on the login screen, or ask
   an engineer to reset it from Postgres.

## What you can edit

| Screen | What it controls |
|---|---|
| **Globals → Homepage** | Hero heading, problem/solution copy, footer CTA — the main `/` page sections |
| **Collections → Cards** | Small content blocks (home symptoms, role/pillar cards, product spotlight/capability cards). Filter by the `slot` column to find the right group. |
| **Collections → Products** | Per-product page copy (hero, problem, final CTA, FAQ heading) — one row per product |
| **Collections → Faqs** | FAQ question/answer pairs, filtered by `product-slug` |

## How to edit

1. Click into the Global or Collection item you want to change
2. Edit the text field(s)
3. Click **Save**
4. Refresh the live site after ~5 minutes to see the change (it's cached
   briefly for speed)

## Important — do not do this

- **Don't ask an engineer to "reseed" or "reset" content** after you've made
  edits. The seed script that originally loaded this content will **delete
  and overwrite** everything in Cards/Products/Faqs and the Homepage global
  with the original defaults, wiping your edits. (Engineers: this is now
  blocked by default — see `web/scripts/seed-app.ts`.)
- If a page looks unchanged after 10+ minutes, tell an engineer — that
  usually means the CMS connection needs a check, not that your edit failed.

## Who to contact

If login doesn't work, a field is missing, or something looks broken after
saving, contact the engineering team rather than trying to fix it in the
admin UI — some structural fields (new sections, new products) still require
a code change.
