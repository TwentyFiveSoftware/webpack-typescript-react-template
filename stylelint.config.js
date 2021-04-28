module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
        'at-rule-no-unknown': null,
    },
    ignoreFiles: ['node_modules/**/*', 'dist/**/*'],
};
