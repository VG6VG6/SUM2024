import terser from '@rollup/plugin-terser';

export default {
    input: "src/game.js",
    output: {
        file: "output/game.min.js",
        format: "cjs",
        sourcemap: "inline"
    },
    plugins: [terser()],
}