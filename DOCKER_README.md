# Docker Setup for React Firebase DevOps Project

This document provides instructions for setting up, building, and deploying the React Firebase application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Docker Hub account (or GitHub Container Registry)
- Git

## Project Structure

The project includes the following Docker-related files:

- `Dockerfile` - For building the React application
- `api/Dockerfile` - For building the Node.js API
- `docker-compose.yml` - For local development with React, API, and PostgreSQL
- `docker-stack.yml` - For deployment to Docker Swarm
- `nginx/nginx.conf` - Nginx configuration for serving the React app
- `scan-image.sh` - Script for scanning Docker images for vulnerabilities

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/syifaniads/react-firebase-devops.git
   cd react-firebase-devops
   ```

2. Create a `.env` file based on the `.env.example` template:
   ```bash
   cp .env.example .env
   ```

3. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:80
   - API: http://localhost:8080/api/health

## Building and Pushing Images

1. Build the images:
   ```bash
   docker build -t your-username/react-firebase-app:latest .
   docker build -t your-username/react-firebase-api:latest ./api
   ```

2. Push the images to Docker Hub:
   ```bash
   docker login
   docker push your-username/react-firebase-app:latest
   docker push your-username/react-firebase-api:latest
   ```

## Scanning Images for Security Vulnerabilities

1. Make the scan script executable:
   ```bash
   chmod +x scan-image.sh
   ```

2. Install Trivy:
   ```bash
   # For Ubuntu/Debian
   sudo apt-get install -y wget apt-transport-https gnupg lsb-release
   wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
   echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
   sudo apt-get update
   sudo apt-get install -y trivy
   
   # For macOS
   brew install trivy
   ```

3. Run the scan on your images:
   ```bash
   ./scan-image.sh your-username/react-firebase-app:latest
   ./scan-image.sh your-username/react-firebase-api:latest
   ```

4. Review the scan results in the `security-scans` directory and address any vulnerabilities.

## Deploying to Docker Swarm

1. Initialize Docker Swarm (if not already done):
   ```bash
   docker swarm init
   ```

2. Deploy the stack:
   ```bash
   export DOCKER_REGISTRY=your-username
   docker stack deploy -c docker-stack.yml react-firebase
   ```

3. Check the status of your services:
   ```bash
   docker stack services react-firebase
   ```

4. Access the deployed application at the IP address of your Swarm manager node.

## Docker Networking & Volume

- The application uses a bridge network in development and an overlay network in Swarm mode.
- PostgreSQL data is persisted using a Docker volume named `postgres-data`.

## Security Best Practices

1. Use multi-stage builds to reduce image size
2. Run containers with non-root users when possible
3. Scan images regularly for vulnerabilities
4. Keep base images updated
5. Use environment variables for sensitive information
6. Implement proper network segmentation

## Troubleshooting

- **Database Connection Issues**: Ensure the correct environment variables are set in your `.env` file.
- **Permission Issues**: Verify that volumes have proper permissions.
- **Network Connectivity**: Check that services are on the same network and can communicate.

For more information, refer to the Docker documentation at [https://docs.docker.com/](https://docs.docker.com/).
