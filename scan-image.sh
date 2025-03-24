#!/bin/bash

# Check if image name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <image-name>"
    exit 1
fi

IMAGE_NAME=$1
OUTPUT_DIR="security-scans"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Starting security scan for image: $IMAGE_NAME"

# Scan with Trivy
echo "Running Trivy scan..."
trivy image --format json --output "$OUTPUT_DIR/${IMAGE_NAME//\//_}_trivy_$TIMESTAMP.json" "$IMAGE_NAME"
trivy image --severity HIGH,CRITICAL --output "$OUTPUT_DIR/${IMAGE_NAME//\//_}_trivy_summary_$TIMESTAMP.txt" "$IMAGE_NAME"

# Scan with Docker Scout (if available)
if command -v docker-scout &> /dev/null; then
    echo "Running Docker Scout scan..."
    docker scout cves "$IMAGE_NAME" --output "$OUTPUT_DIR/${IMAGE_NAME//\//_}_scout_$TIMESTAMP.txt"
elif command -v docker &> /dev/null && docker scan --help &> /dev/null; then
    echo "Running Docker Scan..."
    docker scan --json "$IMAGE_NAME" > "$OUTPUT_DIR/${IMAGE_NAME//\//_}_docker_scan_$TIMESTAMP.json"
else
    echo "Docker Scout/Scan not available. Install Docker extension for scanning."
fi

echo "Scan completed. Results saved in $OUTPUT_DIR directory."
echo "Please review the scan results for security vulnerabilities and follow the recommended remediation steps."
