from fastapi import FastAPI

app = FastAPI(title="tultenet API", version="1.0.0")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/users")
def users() -> list[dict[str, object]]:
    return [
        {"id": 1, "name": "Ada Lovelace"},
        {"id": 2, "name": "Alan Turing"},
    ]
