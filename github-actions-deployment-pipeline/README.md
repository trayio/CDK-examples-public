## Overview

This is an example for how CDK connectors can be deployed as part of an automated CI/CD pipeline using Github actions.

The `.github/` directory contains all the github actions related code. If you are not using github actions you can use the code as inspiration for your own pipeline.

The `example-connector/` directory is the default connector that is created via `tray-cdk connector init`, it exists only to illustrate where to place your connectors. This github actions workflow is designed to work with mutliple connectors too as a monorepo.

## Prerequisites

When using these workflows, ensure you have first set your Tray API tokens for each region (US, EU and APAC) in Github repository secrets. To do so, in your repo navigate to settings > secrets and variables > actions > new repository secret. You will need to use the following variable names for the respective tokens: `TRAY_API_KEY_US` `TRAY_API_KEY_EU` `TRAY_API_KEY_APAC`. You can find documentation on [how to generate long life API tokens here](https://tray.io/documentation/tray-uac/governance/org-management/creating-api-tokens/).

If you do not need your connector available in every region, in the `deploy_connector.yml` workflow modfiy the `region: [US, EU, APAC]` array, removing any regions you don't want to deploy to.

Note that any connectors deployed using this token will be owned by it. If you would later want to share this connector using the Tray-cdk CLI you will also need to use this same token (more on this in the deploying on merge to main branch section).

## Handling multiple connectors

These workflows work with a monorepo setup, as we find this the simpliest way to maintain multiple connectors with the same deployment process. You can have multiple connector directories in the root directory, this example contains a single default connector `example-connector/`.

When the deploy workflow is invoked it will first identify which connector directory contains changes when compared with the main branch. Then the deploy workflow will then execute against that changed connector.

To avoid mistakes the workflow will fail if more than 1 connector has changes. We recommend you open separate PRs for separate connectors to keep PRs managable.

If a connector directory has been deleted this won't cause the connector to be deleted or redeployed, it will be skipped.

Your specific requirements might necessitate additional directories in the root directory. The deploy workflow will treat these as connectors. To prevent this modify the `FILES_IGNORE` env variable in the `deploy_connector.yml` workflow. There is an example `terraform/` directory there to demonstrate how this works and can be deleted if you do not need it.

## Deploying on merge to main branch

When merging a pull request into the main branch the `deploy_connector` workflow will be invoked, but you can change the event that starts the workflow to better suit your requirements e.g. on manual invocation, on new PR commit, etc. After the deployment has started the workflow will poll the deployment status endpoint until the deployment has completed.

Now other users can use the connector in Tray workflows after you share it with them using the `tray-cdk permissions add` command in the `@trayio/cdk-cli`. Ensure you use the same token for both deploying/publishing the connector as you do for sharing it.


## Deploy workflow overview 
1. load Tray API token from github secrets
2. git checkout code
3. Identify connector directories with changes
4. Fail if more than 1 connector has been changed
5. Filter out any deleted connectors from the changes
6. For each region (US, EU, APAC):
    1. read connector.json file
    2. load connector name and version from connector.json into variables
    3. Install the tray-cdk and run the build command to generate the connector.zip (you may omit this step so long as you run the build command locally and commit your `.tray/connector.zip` to your repo before deployment)
    4. base64 encode the built connector zip `.tray/connector.zip`
    5. makes curl request to deployment/publish API, using connector name, version and API token
    6. writes status code and body of curl request to output, this step will fail if a 200 response is not recieved from the deployment service
    7. poll the get deployment status endpoint until the deployment has completed
