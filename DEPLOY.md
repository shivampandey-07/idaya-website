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
- Catalogue filters and the enquiry dialog work without a backend. Enquiries are copied and sent manually through Instagram.
- No AI or ChatGPT branding appears on the page.
- Catalogue images are credited illustrative references, not confirmed IDAYA products.
- The page is marked `noindex,nofollow` while it is a preview. Remove that meta tag in `index.html` when the site is ready to be found in search.
- The separate `shivampandey-07.github.io` homepage repository is untouched.
