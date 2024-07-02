const core = require('@actions/core');
const fs = require("fs");
const path = require('path');

function run() {
	try {
		const allChangedConnectors = JSON.parse(core.getInput('ALL_CHANGED_FILES'));

		core.info(`ALL_CHANGED_FILES: ${allChangedConnectors}`);

		const changedNotDeletedConnectors = allChangedConnectors
			.filter(dir => {
				if (fs.existsSync(path.join(process.env.GITHUB_WORKSPACE, dir))) {
					return true;
				}
				else {
					core.info(`Connector has been deleted: ${dir}`,);
					return false;
				}
			});

		if (changedNotDeletedConnectors.length > 1) {
			throw new Error(
				`Expected changes in maximum 1 connector folder, but found changes in: ${JSON.stringify(changedNotDeletedConnectors)}.`,
			);
		}

		const containsConnectorChanges = changedNotDeletedConnectors.length > 0;

		core.setOutput('CONTAINS_CONNECTOR_CHANGES', containsConnectorChanges);
		core.setOutput('CONNECTOR_DIR_NAME', changedNotDeletedConnectors[0]);

		core.info(
			`Connectors with changes: ${changedNotDeletedConnectors[0]}`,
		);

	} catch (error) {
		core.setFailed(error.message);
	}
}

module.exports = run;

if (require.main === module) {
	run();
}
