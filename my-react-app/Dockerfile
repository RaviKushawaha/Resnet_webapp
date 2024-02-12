# Use an official Node runtime as a parent image
FROM node:14

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Add rest of the client app
COPY . ./

#Build for production
RUN npm run build

# serve the app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]