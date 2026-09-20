# Deploy IDAYA

This is the complete standalone static website, including the hero video and all images. No dependencies or build step are required.

## Live site
- Repository: https://github.com/shivampandey-07/idaya-website
- Published page: https://shivampandey-07.github.io/idaya-website/

GitHub Pages serves the `main` branch from the root folder. `.nojekyll` is present so Jekyll does not process the files.

## Publishing an update
1. Edit the files locally.
2. `git add -A && git commit -m "..." && git push`
3. Pages rebuilds automatically; the change is usually live within a minute.

To move the site elsewhere, copy this folder to any static web server. All paths are relative, so it also works from a subdirectory.

## Project handoff
- HTML, CSS and JavaScript are directly editable.
- The hero video autoplays silently and loops; no play/pause button is displayed. Reduced-motion settings show the poster instead.
- The enquiry dialog works without a backend, and each look's enquiry carries that post's link, so the boutique knows which look is meant. Enquiries go out over WhatsApp or are copied and pasted into Instagram.
- The bridal/pret/couture filter bar was removed: every post on the account is bridal, so two of the three filters were labelling bridal looks as something else. Once IDAYA points at pret and couture posts, the filter can come back (it is in git history at `e18d0fb`).
- The collection is seven Instagram embeds of @idaya_delhi posts, not hosted photography; the separate showcase section was folded into it. To feature different looks, swap the `data-instgrm-permalink`, the matching `href` and the `data-enquire` value on that card in `index.html`; the post must be public for the embed to render.
- `embed.js` is fetched only when the collection nears the viewport. If a visitor blocks Instagram (ad blockers commonly do), each card falls back to a branded lotus card linking to the post.
- The page is marked `noindex,nofollow` while it is a preview. Remove that meta tag in `index.html` when the site is ready to be found in search.
- The separate `shivampandey-07.github.io` homepage repository is untouched.
