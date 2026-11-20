# Swap these placeholders

The live studio details are already filled in: the name, the Chandapura address, the phone number +91 92067 10049, the timings, and the 5.0 Google rating. Everything below is waiting for the real Dance & Joy Studio material.

Search `index.html` for `PLACEHOLDER` to jump to each spot. Line numbers match the file as it is today.

## Logo

- File: `images/logo.svg` (also used as the browser icon via `favicon.svg`)
- Navbar: `index.html` line 67, comment `PLACEHOLDER: logo`
- Footer: `index.html` line 531, same comment
- Replace the SVG with the real mark. Keep the file name `images/logo.svg`, or change both `<img src="images/logo.svg">` tags if you use a PNG.

## Instructor

- Name: `index.html` line 136, the text `[INSTRUCTOR NAME]`, comment on line 131 `PLACEHOLDER: instructor name`
- Photo: the “DJS” tile just above that name. Comment on line 132 `PLACEHOLDER: instructor photo`. Replace the `<div class="portrait">` with an image of the founder, and give it a short alt text such as “Photo of [name], founder of Dance & Joy Studio”.

## Photos

Each gallery picture is a stock photo with a caption that starts “Placeholder”. Replace the file, keep the same name, and the page updates. Update the alt text so it describes the real DJS photo.

| What to replace | File | Comment in `index.html` |
| --- | --- | --- |
| Hero (phone) | `images/hero-800.jpg` | line 93 `PLACEHOLDER: photo hero` |
| Hero (larger screens) | `images/hero-1600.jpg` | same comment |
| Kids class | `images/kids-class.jpg` | line 296 |
| Classical pose | `images/classical.jpg` | line 301 |
| Bollywood group | `images/bollywood.jpg` | line 306 |
| Stage | `images/stage.jpg` | line 311 |
| Group dance | `images/group.jpg` | line 316 |
| Zumba | `images/zumba.jpg` | line 321 |
| Folk | `images/folk.jpg` | line 326 |
| Contemporary | `images/contemporary.jpg` | line 331 |
| Western | `images/western.jpg` | line 336 |
| Freestyle | `images/freestyle.jpg` | line 341 |

The stage photo is also used behind the video button. After you replace `images/stage.jpg`, that preview updates too.

When the photos are yours, you can delete the credit sentence at the bottom of `index.html` (the paragraph that starts “Placeholder photos, to be replaced”).

## Video

There is no studio film yet. The play button is marked “Placeholder · studio video coming soon” (`index.html` line 349, comment `PLACEHOLDER: video`). It opens a note, not a real video. When you have a link (YouTube or similar), replace that button with the real embed and remove the placeholder panel around line 594.

## Achievements

`index.html` line 361, comment `PLACEHOLDER: achievements`. The heading on line 363 reads “Shows, competitions & achievements – coming soon”. The three cards under it are marked “To be updated” (lines 366, 371 and 376). Replace the titles and sentences with real shows, competitions and milestones.

## Reviews

Three sample parent quotes, each labelled “Placeholder review”. They are not real Google reviews.

- Review 1: line 394
- Review 2: line 400
- Review 3: line 404

Replace the sentences and the “Placeholder review · Parent” line with real quotes and first names (only with the family’s permission). The “5.0 Google” badge and “Read more on Google” already go to the studio’s Maps listing.

## Instagram

The link is the empty placeholder `https://instagram.com/`.

- Contact section: line 483, comment `PLACEHOLDER: instagram`
- Footer icon: line 566, comment `PLACEHOLDER: instagram`

Change both addresses to the real handle, for example `https://instagram.com/yourhandle`, and remove the words “handle coming soon”.

## Link preview image

`index.html` line 11, comment about `og:url` and `og:image`. When the site has a public address, set `og:image` and `twitter:image` to the full address of the hero photo (starting with `https://`).

## Phone number, if it ever changes

The number +91 92067 10049 is already the studio’s. If it changes, search the folder for `919206710049` and update every match, including `script.js` line 258 (the enquiry form) and the telephone line in the page header (line 35).
