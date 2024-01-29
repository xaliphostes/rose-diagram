const path = require('path');

module.exports = {

    entry: './src/RoseDiagram.ts',

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },

    externals: {
        "d3": "d3"
    },

    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "RoseDiagram",
        filename: 'RoseDiagram.js',
        path: path.resolve(__dirname, 'dist')
    }

};
