#!/bin/bash

# 1. Run database migrations
php artisan migrate --force

# 2. Start Inertia SSR engine in the background
echo "Starting Inertia SSR..."
php artisan inertia:start-ssr &

# 3. Start Apache web server in the foreground
echo "Starting Apache..."
exec apache2-foregrounds