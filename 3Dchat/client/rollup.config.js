import terser from '@rollup/plugin-terser';

export default {
    input: "src/index.js",
    output: {
        file: "output/index.min.js",
        format: "cjs",
        sourcemap: "inline"
    },
    plugins: [terser()],
}