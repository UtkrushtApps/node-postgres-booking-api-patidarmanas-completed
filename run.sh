#!/usr/bin/env bash
set -e

cd /root/task

echo "Starting Docker services with docker-compose..."
docker-compose -f /root/task/docker-compose.yml up -d

echo "Waiting for PostgreSQL to be ready..."
RETRIES=30
until docker exec task_postgres pg_isready -U taskuser -d utkrusht_booking -h localhost >/dev/null 2>&1; do
  RETRIES=$((RETRIES-1))
  if [ $RETRIES -le 0 ]; then
    echo "PostgreSQL did not become ready in time."
    exit 1
  fi
  echo "PostgreSQL is not ready yet. Retrying..."
  sleep 2
done

echo "PostgreSQL is ready. Applying schema.sql if present..."
if [ -f /root/task/schema.sql ]; then
  docker exec -i task_postgres psql -U taskuser -d utkrusht_booking < /root/task/schema.sql || true
fi

echo "Applying data/sample_data.sql if present..."
if [ -f /root/task/data/sample_data.sql ]; then
  docker exec -i task_postgres psql -U taskuser -d utkrusht_booking < /root/task/data/sample_data.sql || true
fi

echo "Creating additional database roles and users if needed..."
docker exec -i task_postgres psql -U taskuser -d utkrusht_booking <<'EOF'
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'readonly_user') THEN
    CREATE ROLE readonly_user LOGIN PASSWORD 'readonlypass';
    GRANT CONNECT ON DATABASE utkrusht_booking TO readonly_user;
  END IF;
END$$;
EOF

echo "Validating that Node.js application is responding..."
RETRIES=30
until curl -s http://localhost:3000/health >/dev/null 2>&1; do
  RETRIES=$((RETRIES-1))
  if [ $RETRIES -le 0 ]; then
    echo "Node.js application did not respond in time."
    exit 1
  fi
  echo "Waiting for Node.js application to respond..."
  sleep 2
done

echo "Setup completed. API should now be reachable on port 3000 and PostgreSQL on port 5432."
