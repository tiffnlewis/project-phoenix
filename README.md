# Project Phoenix

A mobile-first, knee-aware home workout tracker that runs directly on GitHub Pages.

## Why this version works

This release is a standalone HTML application. It does not require React, Vite, Node.js, or a build step. GitHub Pages can serve `index.html` directly.

## Replace the blank version

Copy `index.html` and `README.md` into your existing `project-phoenix` folder, replacing the old files. Then run:

```bash
git add .
git commit -m "Fix blank app and add working tracker"
git push
```

## Turn on GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch **main** and folder **/(root)**.
5. Save.

The site should appear at:

`https://YOUR-USERNAME.github.io/project-phoenix/`

## Data and privacy

Workout and measurement data are saved in the current browser using local storage. Use the Export Data button to create backups.

## Medical note

This app is a personal tracking tool, not medical advice or a diagnosis. Persistent knee pain, swelling, locking, instability, worsening symptoms, or restricted movement should be evaluated by a qualified healthcare professional.
