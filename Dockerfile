# APXESS static storefront — nginx serving plain HTML/CSS/JS.
FROM nginx:1.27-alpine

# Site nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Static site files (build context; see .dockerignore for exclusions)
COPY . /usr/share/nginx/html

# Remove non-web files that got copied into the web root
RUN rm -rf /usr/share/nginx/html/deploy \
           /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker-compose.yml \
           /usr/share/nginx/html/.dockerignore \
           /usr/share/nginx/html/DEPLOY.md \
           /usr/share/nginx/html/.git

EXPOSE 80
