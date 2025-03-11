# This file contains the instrucitons to build the docker image for the project
# First stage: Build the frontend
FROM node:lts-alpine AS frontend

WORKDIR /app
COPY package*.json /app
COPY frontend /app/frontend
WORKDIR /app/frontend
RUN npm ci && npm run build

# Second stage: Backend
FROM node:lts-alpine AS backend

WORKDIR /app
COPY package*.json /app
COPY backend /app/backend
WORKDIR /app/backend
RUN npm ci

# Copy the frontend build to serve on the backend
COPY --from=frontend /app/frontend/dist /app/backend/src/dist

EXPOSE 4882
CMD ["npm", "run", "start"]