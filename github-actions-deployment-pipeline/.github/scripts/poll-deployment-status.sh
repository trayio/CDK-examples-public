#!/bin/bash

API_BASE_URL=$1
API_TOKEN=$2
CONNECTOR_NAME=$3
CONNECTOR_VERSION=$4

API_URL="${API_BASE_URL}/cdk/v1/deployments/connectors/${CONNECTOR_NAME}/versions/${CONNECTOR_VERSION}/latest"

# Loop until the deployment status is 'Deployed'
while true; do
  response=$(curl -s -H "Authorization: Bearer $API_TOKEN" "$API_URL")
  deploymentStatus=$(echo $response | jq -r '.deploymentStatus')

  case $deploymentStatus in
    'Deployed')
      echo "Deployment successful."
      exit 0
      ;;
    'Deploying'|'Building')
      echo "Deployment in progress: $deploymentStatus..."
      sleep 5
      ;;
    *)
      echo "Error: There was an error deploying the connector - $deploymentStatus"
      exit 1
      ;;
  esac
done