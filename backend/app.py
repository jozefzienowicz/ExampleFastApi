import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path


def create_app():
    creating_app = FastAPI(docs_url=None, redoc_url=None)

    creating_app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )

    return creating_app


app = create_app()


@app.on_event("startup")
def register_routes():
    from api.endpoints import favourite_zip_codes

    app.include_router(favourite_zip_codes.router)


def run_server():
    project_dir = Path(__file__).parents[1]
    uvicorn.run(
        app="app:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        workers=4,
        reload_dirs=[project_dir / "backend"],
    )


if __name__ == "__main__":
    run_server()
