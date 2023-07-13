# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy application code
COPY . .

#ENV NODE_OPTIONS="--max-old-space-size=4096"

# Expose the port your React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

