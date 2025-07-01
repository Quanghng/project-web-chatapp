# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the Prisma schema file
# This allows `npm install` to trigger the `postinstall` hook correctly
COPY prisma ./prisma/

# Install dependencies (this will also run `prisma generate` because of the postinstall script)
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build your app if you have a build step (e.g., for production)
# RUN npm run build

# Expose port your app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]