#!/bin/bash

# 1. Run database migrations
php artisan migrate --force

# 2. Start Inertia SSR engine in the background
echo "Starting Inertia SSR..."
php artisan inertia:start-ssr &

# 3. Start the queue worker for comment notification emails.
# Note: on Render's free tier the whole container (and this process) sleeps
# after ~15min of no HTTP traffic, so queued mail is delivered on next wake-up, not instantly.
echo "Starting queue worker..."
php artisan queue:work --tries=3 --sleep=3 &

# 4. Start Apache web server in the foreground
echo "Starting Apache..."
exec apache2-foreground