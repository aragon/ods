var fs = require('fs');

const changelogPath = './CHANGELOG.md';

module.exports = async ({ core }) => {
    const { version } = process.env;
    const date = new Date().toISOString().substring(0, 10);

    core.info(`Update changelog for version ${version} with date ${date}`);

    try {
        const changelog = fs.readFileSync(changelogPath, { encoding: 'utf8', flag: 'r' });
        const newChangelog = changelog.replace(/\[Unreleased\]/gm, `[Unreleased]\n\n## [${version}] - ${date}`);
        fs.writeFileSync(changelogPath, newChangelog);
        core.info(`Changelog updated successfully.`);
    } catch (error) {
        core.error(`Error updating CHANGELOG file: ${error}`);
    }
};
