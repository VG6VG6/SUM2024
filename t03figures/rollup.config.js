import terser from '@rollup/plugin-terser';

export default {
    input: "src/main.js",
    output: {
        dir: "output",
        format: "cjs",
        sourcemap: "inline"
    },
    plugins: [terser()],
}