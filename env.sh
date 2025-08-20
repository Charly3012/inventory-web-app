#!/bin/sh
echo "Replacing environment variables..."
envsubst '${VITE_API_URL}' < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

echo "Starting web server..."
exec nginx -g 'daemon off;'
