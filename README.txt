ZAINIIII — PREMIUM BIRTHDAY WEBSITE
====================================

FILES
- index.html       Birthday countdown landing page (entry point)
- home.html        Birthday home / six chapter navigation
- page1.html      Our Beautiful Beginning
- page2.html      A Thousand Reasons to Love You
- page3.html      Your Beautiful Memories
- page4.html      Letters From My Heart
- page5.html      Our Dreams & Forever
- page6.html      The Queen of My Universe
- letter.html     Secret interactive love letter
- style.css       Shared premium dark-maroon theme and animations
- common.js       Shared navigation, card flip, reveal and music controls
- assets/         Put your music file here

HOW TO PREVIEW BEFORE BIRTHDAY
1. Open home.html or any page1.html ... page6.html / letter.html directly.
2. index.html is the birthday countdown and locked entrance.
3. On 26 Nov 2026 at 00:00 Pakistan Standard Time, the button on index.html becomes active.
4. For a local preview, opening individual HTML files directly works. For deployment, upload the entire folder to a static host.

PHOTOS
Each chapter page has 10 empty photo placeholders (60 total).
To insert a photo, replace the relevant <div class="photo-placeholder">...</div> in a page with:
<div class="photo-placeholder"><img src="assets/your-photo.jpg" alt="A favourite memory"></div>
Add this CSS rule to style.css:
.photo-placeholder img { width:100%; height:100%; min-height:265px; object-fit:cover; display:block; }

MUSIC
Put a music file you have permission to use at:
assets/your-song.mp3
The music button starts playback after the visitor clicks it (browsers require user interaction).

IMPORTANT COUNTDOWN NOTE
The birthday unlock time is set to 2026-11-25 19:00 UTC, which equals 2026-11-26 00:00 in Pakistan (Asia/Karachi).
The unlock is client-side only. It is a presentation gate, not secure access control: anyone can open home.html/page files directly or change their device clock. Do not use this for confidential content. The individual page files are intentionally directly accessible before the birthday so you can preview and edit them.

CUSTOMISE THE LETTER
Edit the text inside letter.html in the <article class="letter-paper"> section.


INDEX PAGE ROUND PHOTO
The birthday countdown page now has a circular photo placeholder.
To add your own picture, replace the contents of <div class="gate-photo"> in index.html
with:
<img src="assets/zainiiii-photo.jpg" alt="ZAINIIII">
Then place your image at assets/zainiiii-photo.jpg.


LATEST UPDATE — EXACT CHAPTERS, BRANDING & LOGIN
================================================
Navigation order:
Home: احبک
Chapter 1: ملاقاتیں
Chapter 2: Meri or Zaini K gifts
Chapter 3: کمال آنکھیں
Chapter 4: Hmari Yaday
Chapter 5: Favourites
Chapter 6: Hmaray Rulessss
Secret Letter: Jaan k Naam aik Khat

Flow: index.html countdown -> login.html -> home.html.
ID: zaini (case-sensitive)
Password: sher (case-sensitive)
Hints appear below the corresponding login fields.
Show/hide password is available.
Successful login is remembered in sessionStorage for this browser tab.
Protected pages redirect to login.html without an authenticated session.
login.html redirects to index.html before birthday unlock.

Logo: Z ♥ R across the countdown, login, home and chapter pages.

Updated files: index.html, home.html, page1.html-page6.html, letter.html,
common.js, style.css, README.txt. Added login.html.
Preserved original zainiiii.jpg, all ten card titles/texts per chapter,
existing letter body, countdown date, and existing image paths.

Security note: this is a front-end-only static website. Credentials are
visible in browser JavaScript and sessionStorage is not secure authentication.
It is a playful romantic gate, not protection for confidential information.


AUTH FLOW UPDATE — COUNTDOWN AND LOGIN ARE INDEPENDENT
======================================================
- index.html keeps its original birthday countdown and original timed entrance.
- A separate "Skip countdown · Go to login" link opens login.html at any time.
- login.html no longer checks the birthday date. Login is available whether the countdown is running or finished.
- home.html, page1.html through page6.html, and letter.html require a successful login.
- Direct protected-page visits save the requested page and redirect to login.html.
- Successful login returns the visitor to the requested page; otherwise it opens home.html.
- The session is stored in sessionStorage, so it remains active across navigation and refreshes in the same browser tab.
- The countdown does not grant or deny authentication.

Front-end limitation: static HTML/JS authentication can be bypassed by a technically capable visitor because credentials and session state exist in the browser. It is a casual romantic gate, not server-enforced security.
