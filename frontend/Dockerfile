# Stage 1: Build the React application
FROM node:20-alpine AS builder

# Declare build arguments for Vite environment variables
# These will be set by docker-compose.yml using the 'args' build option
ARG VITE_API_BASE_URL
ARG VITE_GRAPHQL_HTTP_URL

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
# This means npm install only re-runs if dependencies change
COPY package.json ./
# If you use yarn: COPY yarn.lock ./

# Install dependencies
RUN npm install
# If you use yarn: RUN yarn install

# Copy the rest of your application code
COPY . .

# Set environment variables for the build process
# These are crucial for Vite to pick them up during 'npm run build'
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GRAPHQL_HTTP_URL=$VITE_GRAPHQL_HTTP_URL

# Build the React application for production
# This command depends on your package.json scripts, commonly 'build'
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the builder stage to Nginx's serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80, which Nginx will listen on
EXPOSE 80

# Command to run Nginx (default command for nginx:alpine)
CMD ["nginx", "-g", "daemon off;"]