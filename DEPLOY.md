# Deploy IDAYA

This is the complete standalone static website, including the hero video and all images. No dependencies or build step are required.

## Live site
- Repository: https://github.com/shivampandey-07/idaya-website
- Published page: https://shivampandey-07.github.io/idaya-website/

GitHub Pages serves the `main` branch from the root folder. `.nojekyll` is present so Jekyll does not process the files.

## Publishing an update
1. Edit the files locally.
2. If you changed `style.css`, `app.js` or the film, bump the `?v=` number on
   that file's reference in `index.html`. Pages serves assets with a ten minute
   cache and phones hold them longer still; without the bump a visitor can keep
   seeing the previous build. The number is arbitrary - just make it different.
3. `git add -A && git commit -m "..." && git push`
4. Pages rebuilds automatically; the change is usually live within a minute.

`index.html` itself cannot be versioned this way, so to check an update on a
phone straight after publishing, open it in a private tab rather than trusting
a refresh.

To move the site elsewhere, copy this folder to any static web server. All paths are relative, so it also works from a subdirectory.

## Project handoff
- HTML, CSS and JavaScript are directly editable.
- The hero video autoplays silently and loops. iOS refuses autoplay outright in
  Low Power Mode, so if `play()` is refused a gold play cue appears over the
  film and a tap anywhere on the hero starts it; otherwise no control is shown.
  Reduced-motion settings show the poster instead.
- The enquiry dialog works without a backend, and each look's enquiry carries that post's link, so the boutique knows which look is meant. Enquiries go out over WhatsApp or are copied and pasted into Instagram.
- The bridal/pret/couture filter bar was removed: every post on the account is bridal, so two of the three filters were labelling bridal looks as something else. Once IDAYA points at pret and couture posts, the filter can come back (it is in git history at `dcf5aaa`).
- The collection is seven Instagram embeds of @idaya_delhi posts, not hosted photography; the separate showcase section was folded into it. To feature different looks, swap the `data-instgrm-permalink`, the matching `href` and the `data-enquire` value on that card in `index.html`; the post must be public for the embed to render.
- `embed.js` is fetched only when the collection nears the viewport. If a visitor blocks Instagram (ad blockers commonly do), each card falls back to a branded lotus card linking to the post.
- The page is marked `noindex,nofollow` while it is a preview. Remove that meta tag in `index.html` when the site is ready to be found in search.
- The separate `shivampandey-07.github.io` homepage repository is untouched.
