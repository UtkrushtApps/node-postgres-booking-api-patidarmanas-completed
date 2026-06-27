#!/usr/bin/env bash
set -e

echo "Stopping and removing Docker containers, volumes, and networks for task..."
docker-compose -f /root/task/docker-compose.yml down --volumes --remove-orphans || true

echo "Removing specific Docker images related to this task if present..."
IMAGES=$(docker images -q | grep -E 'postgres:15-alpine' || true)
if [ -n "$IMAGES" ]; then
  docker rmi -f $IMAGES || true
fi
IMAGES_NODE=$(docker images -q | grep -E 'task_node|utkrusht-booking-api' || true)
if [ -n "$IMAGES_NODE" ]; then
  docker rmi -f $IMAGES_NODE || true
fi

echo "Running docker system prune to clean up dangling resources..."
docker system prune -a --volumes -f || true

echo "Deleting /root/task directory and all contents..."
rm -rf /root/task || true

echo "Cleanup completed successfully! Droplet is now clean."
