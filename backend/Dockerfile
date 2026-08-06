# PricePilot FastAPI service (AI search, chatbot, product CRUD)
FROM python:3.12-slim

# lxml and psycopg2 need a compiler on slim images only if wheels are missing;
# both ship manylinux wheels, so we stay lean and skip build-essential.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

# Render/Railway inject PORT; default to 8000 for local `docker run`.
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
