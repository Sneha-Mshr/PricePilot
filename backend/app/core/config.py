from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "PricePilot"

    # PostgreSQL. Managed providers (Render, Railway, Neon, Supabase) hand out
    # `postgres://` URLs, which SQLAlchemy 2.x no longer recognises — normalised
    # in `database_url` below.
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/pricepilot"

    # Comma-separated list of origins allowed to call this API.
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    # Google Gemini key for the shopping chatbot. Empty = rule-based fallback.
    GEMINI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    @property
    def database_url(self) -> str:
        url = self.DATABASE_URL.strip()
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()
