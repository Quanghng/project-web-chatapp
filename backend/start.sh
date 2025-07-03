#!/bin/sh

# This script will wait for the postgres service to be available
# and then run prisma migrations before starting the NestJS app.


echo "Waiting for PostgreSQL to be healthy..."
/usr/src/app/wait-for-it.sh postgres:5432 --timeout=30 --strict -- echo "PostgreSQL is up and running!"

echo "Running Prisma migrations..."
# This command applies any pending migrations to the database.
npm run prisma:generate
npm run migrate:deploy

echo "Starting NestJS application..."
# Use 'exec' to replace the current shell process with the Node.js process,
# passing signals correctly (e.g., Ctrl+C to stop the container).
exec npm run start