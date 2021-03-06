const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        App: "./src/Apps/Checklist/scripts/Components/WorkItemFormGroup/App.tsx",
        SettingsApp: "./src/Apps/Checklist/scripts/Components/SettingsApp/SettingsApp.tsx"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 0,
            maxInitialRequests: Infinity,
            cacheGroups: {
                default: false,
                vendors: false,
                sdk: {
                    test: /[\\/]node_modules[\\/](azure-devops-extension-sdk)[\\/]/,
                    name: "sdk",
                    chunks: "all",
                    priority: 10
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: "react",
                    chunks: "all",
                    priority: 9
                },
                redux: {
                    test: /[\\/]node_modules[\\/](redux|react-redux|redux-saga|reselect|immer|redux-dynamic-modules|redux-dynamic-modules-saga)[\\/]/,
                    name: "redux",
                    chunks: "all",
                    priority: 8
                },
                ui: {
                    test: /[\\/]node_modules[\\/](azure-devops-ui)[\\/]/,
                    name: "ui",
                    chunks: "all",
                    priority: 7
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./node_modules/es6-promise/dist/es6-promise.min.js", to: "3rdParty/es6-promise.min.js" },

            { from: "./src/Apps/Checklist/images", to: "images" },
            { from: "./src/Apps/Checklist/html", to: "html" },
            { from: "./src/Apps/Checklist/vss-extension.json", to: "vss-extension.json" },
            { from: "./src/Apps/Checklist/README.md", to: "README.md" }
        ])
    ]
};
