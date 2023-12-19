# Use the official Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:18.17.0

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Copy the startup script and make it executable
COPY start-up.sh .
RUN chmod +x ./start-up.sh

# Start the application via the startup script
CMD [ "./start-up.sh" ]

