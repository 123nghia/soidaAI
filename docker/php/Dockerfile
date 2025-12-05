FROM php:7.4-fpm-alpine

# Cài đặt các extension PHP cần thiết cho Laravel
RUN apk add --no-cache \
    $PHPIZE_DEPS \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    mysql-client \
    oniguruma-dev \
    curl

# Cài đặt các extension
RUN docker-php-ext-install pdo pdo_mysql opcache bcmath
RUN docker-php-ext-configure gd --with-jpeg && docker-php-ext-install gd

# Cài đặt Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

CMD ["php-fpm"]
