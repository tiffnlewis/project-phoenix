# Project Phoenix

A mobile-first, knee-aware home workout tracker built with React, TypeScript, and Vite.

## Included

- Green and Blue workout modes
- Standing-first, floor-last exercise flow
- Knee pain and stiffness check-in
- Four-week progression guide
- Workout history and progress statistics
- Waist, lower-belly, arm, and optional weight tracking
- Local-only data storage
- JSON export/import backups
- Installable PWA shell and offline caching
- Automatic GitHub Pages deployment

## Run locally

Install Node.js 22 or later, then:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Deploy to GitHub Pages

1. Create a new empty GitHub repository, for example `project-phoenix`.
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Launch Project Phoenix"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/project-phoenix.git
git push -u origin main
```

3. In the GitHub repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Open the **Actions** tab and allow the included deployment workflow to finish.
6. Your site will be available at `https://YOUR-USERNAME.github.io/project-phoenix/`.

## Install on your phone

Open the deployed site in Safari or Chrome and choose **Add to Home Screen** or **Install app**.

## Privacy

Workout and measurement information is stored in the browser using local storage. It is not committed to GitHub or sent to a server. Use the app's export feature to make backups.

## Medical note

This app is a personal tracking tool, not medical advice or a diagnosis. Persistent knee pain, swelling, locking, instability, worsening symptoms, or restricted movement should be evaluated by a qualified healthcare professional.
