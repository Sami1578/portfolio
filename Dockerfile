# Base image with PHP 8.2 & Apache
FROM php:8.2-apache

# Install system dependencies, configure & install PHP extensions needed for Laravel (with GD WebP support)
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg62-turbo-dev libfreetype6-dev libwebp-dev libonig-dev libxml2-dev zip curl nodejs npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Enable Apache rewrite module for Laravel
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install Composer dependencies (skip scripts during build)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --no-scripts --optimize-autoloader

# Install Node modules & build Vite/Inertia assets (runs client + ssr build)
RUN npm install
RUN npm run build

# Set file permissions for Laravel storage
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configure Apache DocumentRoot to point to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Give execution permissions to the startup script
RUN chmod +x /var/www/html/start.sh

EXPOSE 80

# Execute the startup script on container launch
CMD ["/var/www/html/start.sh"]