# Use a node base image
FROM node:18.17.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Start the server
CMD ["npm", "run", "serve"]

