import terser from '@rollup/plugin-terser';

export default {
    input: "main.js",
    output: {
        file: "output/main.min.js",
        format: "cjs",
        sourcemap: "inline"
    },
    plugins: [terser()],
}