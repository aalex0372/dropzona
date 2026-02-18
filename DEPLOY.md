# Deploy DROPZONE to GitHub + Vercel

Follow these steps to put your project on GitHub and deploy it live with Vercel.

---

## Part 1: Push to GitHub

### Step 1 — Open Terminal in your project folder

- In Cursor: **Terminal → New Terminal** (or `` Ctrl+` `` / `` Cmd+` ``).
- Make sure you’re in the project folder, e.g.:
  ```bash
  cd /Users/aalex/Downloads/idea
  ```

### Step 2 — Initialize Git and make the first commit

Run these commands one by one:

```bash
git init
git add .
git status
```

- `git status` should list your files (e.g. `index.html`, `css/`, `js/`, `mobile/`, etc.).  
- If you see anything you don’t want in the repo (e.g. `node_modules`), it should already be in `.gitignore`.

Then commit:

```bash
git commit -m "Initial commit: DROPZONE desktop + mobile"
```

### Step 3 — Create a new repository on GitHub

1. Go to **https://github.com/new**
2. **Repository name**: e.g. `dropzone` or `dropzone-live`
3. **Description** (optional): e.g. `Live Skin Drops — watch streams, win CS2 skins`
4. Choose **Public**
5. **Do not** check “Add a README”, “Add .gitignore”, or “Choose a license” (you already have files)
6. Click **Create repository**

### Step 4 — Connect your local repo to GitHub and push

GitHub will show you “push an existing repository from the command line”. Use your repo URL in place of `YOUR_USERNAME/YOUR_REPO` below:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

- If GitHub asks for login, use your GitHub account (or create a **Personal Access Token** and use that as the password).
- After this, your code is on GitHub.

---

## Part 2: Deploy on Vercel

### Step 5 — Sign in to Vercel

1. Go to **https://vercel.com**
2. Click **Sign in** and choose **Continue with GitHub**
3. Authorize Vercel to access your GitHub if asked

### Step 6 — Import the GitHub repo

1. On the Vercel dashboard, click **Add New… → Project**
2. Find your repo (e.g. `dropzone` or `dropzone-live`) in the list and click **Import**

### Step 7 — Configure the project (keep defaults)

- **Framework Preset**: leave as **Other** (static HTML/JS)
- **Root Directory**: leave **empty** (use repo root)
- **Build Command**: leave **empty**
- **Output Directory**: leave **empty**
- **Install Command**: leave **empty**

Click **Deploy**.

### Step 8 — Wait for the deploy and get your URL

- Vercel will build and deploy (usually under a minute).
- When it’s done you’ll get a URL like:  
  `https://dropzone-xxxx.vercel.app`
- **Desktop app**: open that URL (e.g. `https://your-project.vercel.app`)
- **Mobile app**: open `https://your-project.vercel.app/mobile/`

---

## After deployment

- **Updates**: change code locally, then:
  ```bash
  git add .
  git commit -m "Your message"
  git push
  ```
  Vercel will automatically redeploy.

- **Custom domain**: In the Vercel project → **Settings → Domains**, add your domain and follow the DNS instructions.

- **Branch deploys**: Every push to `main` deploys production; you can also connect other branches for preview URLs.
