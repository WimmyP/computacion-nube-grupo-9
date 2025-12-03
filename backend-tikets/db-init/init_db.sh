#!/bin/bash
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up and running!"

# Extract connection details from DATABASE_URL
# Example: postgres://USERNAME:PASSWORD@HOST:PORT/DB_NAME
DB_URL=$DATABASE_URL
PGUSER=$(echo $DB_URL | sed -r "s|postgres://([^:]+):.*|\1|")
PGPASSWORD=$(echo $DB_URL | sed -r "s|postgres://[^:]+:([^@]+)@.*|\1|")
PGHOST=$(echo $DB_URL | sed -r "s|postgres://[^@]+@([^:]+):.*|\1|")
PGPORT=$(echo $DB_URL | sed -r "s|postgres://[^@]+@[^:]+:([0-9]+)/.*|\1|")
PGDATABASE=$(echo $DB_URL | sed -r "s|postgres://[^@]+@[^/]+/([^?]+).*|\1|")

export PGPASSWORD=$PGPASSWORD

# Execute the SQL script
echo "Initializing database schema..."
psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -f /app/db.sql

echo "Database initialization complete."
