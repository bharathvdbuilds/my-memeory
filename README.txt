My Memory - a private memory, reminder and to-do app for your iPhone.
An original app. Not affiliated with Memorae or WhatsApp.

INSTALL ON IPHONE
1. Put this folder on any HTTPS web host (for example GitHub Pages) so that index.html is at the root of the site.
2. Open the link in Safari.
3. Tap Share, then Add to Home Screen.
4. Open My Memory from the new icon, not from Safari.

WHAT IT DOES
- Capture: write or paste a memory. Types: Note, Reminder, Task, Idea. #hashtags become tags.
  A small built-in parser reads phrases like "tomorrow 6pm", "in 2 hours", "on 30 Oct", "every day 8am",
  "next monday", and shows what it understood before you save.
- Memories: search (partial match on text and tags), filter by type/tag/status, edit, delete, done, pin.
- Today: "My Day" summary (copy as a WhatsApp message), overdue and due items, snooze, in-app banner.
- Ask my memory: local keyword search. It is NOT AI.
- Share: Web Share button, copy text, copy as a WhatsApp message.
- More: Inbox (paste items, simple rules suggest a type, you accept), Boards (To do / Doing / Done cards,
  can link to a memory), People (reminders for others with a "Send on WhatsApp" link), My apps (saved links),
  Settings (name, colour, storage, export/import/reset).

HONEST LIMITS
- No WhatsApp connection. It cannot read or send WhatsApp messages. "Send on WhatsApp" opens WhatsApp with the
  text typed in (a wa.me link). You press Send yourself. To save a WhatsApp message, copy it and use Paste.
- No AI. "Ask my memory", the Inbox suggestions and My Day use simple keyword and date rules.
- No background notifications. Alerts and the banner only appear while the app is open. iOS allows
  notification permission only for apps added to the Home Screen (iOS 16.4+), and even then this app
  cannot wake itself up when closed.
- Data lives only in this browser on this device (localStorage). Deleting Safari website data, or removing
  the app, erases it. Use Settings > Export regularly. There is no sync between devices.
- The date parser knows English phrases only. Times without am/pm need a colon (18:45). Dates like 12/11 are day/month.
- Tested in headless Chrome at 390x844 only, not on a real iPhone.

FILES
index.html, app.js, styles.css, sw.js (offline cache), manifest.webmanifest, apple-touch-icon.png, icons/
No build step, no backend, no external dependencies. All paths are relative, so it works at the root of a
site or in a sub-folder.
