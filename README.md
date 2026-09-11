# tultenet

A small React (Vite) frontend plus FastAPI backend. The browser always calls the relative API path (`/api/...`), so no CORS configuration is needed in the included local setup or recommended Vercel setup.

## Project layout

```text
tultenet/
├── frontend/          React + Vite app and frontend Vercel settings
├── backend/           FastAPI app and backend Vercel settings
├── docker-compose.yml Local two-service environment
└── .env.example       Optional local port configuration
```

## Run locally with Docker

1. Install Docker Desktop.
2. From this directory, optionally copy `.env.example` to `.env` and adjust ports.
3. Start the application:

   ```bash
   docker compose up --build
   ```

4. Open [http://localhost:3000](http://localhost:3000). The example users should appear.
5. The API is also directly available at [http://localhost:8000/api/health](http://localhost:8000/api/health).

The frontend container proxies `/api/*` to the backend container. Editing either source directory reloads the relevant development server. Stop it with `docker compose down`.

## Run without Docker

Use two terminals:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL (normally `http://localhost:5173`). Its development proxy sends `/api/*` to `http://localhost:8000`.

## Deploy to Vercel

Deploy this monorepo as **two Vercel projects**, connected to the same Git repository.

1. Create the **backend** project. Set its **Root Directory** to `backend`; Vercel uses `backend/vercel.json`. Deploy it and copy its production URL, such as `https://tultenet-api.vercel.app`.
2. In `frontend/vercel.json`, replace `REPLACE-WITH-YOUR-BACKEND-PROJECT` with the backend project's actual hostname. Commit that change.
3. Create the **frontend** project. Set its **Root Directory** to `frontend`; Vercel builds the Vite app and applies its rewrite rule.
4. Attach your domain to the frontend project. Requests to `https://your-domain.example/api/*` are transparently forwarded to the backend project.

After changing the backend URL in the frontend configuration, redeploy the frontend. Test `https://your-domain.example/api/health` and then the frontend page.

## Endpoints

- `GET /api/health` returns `{ "status": "ok" }`
- `GET /api/users` returns sample users displayed by React
