# Use an official Ubuntu base image
FROM ubuntu:latest

# Set the working directory to /app
WORKDIR /app

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port on which your Express app runs
EXPOSE 5000

# Define the command to run your app
CMD ["node", "index.js"]
