import { nodeResolve } from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';

const module = {
    input: 'src/index.ts',
    external: ['@playcanvas/observer'],
    output: {
        dir: `dist/module`,
        entryFileNames: '[name].mjs',
        format: 'esm',
        preserveModules: true
    },
    plugins: [
        nodeResolve(),
        typescript({
            tsconfig: 'tsconfig.json',
            clean: true
        })
    ],
    treeshake: 'smallest',
    cache: false
};

const react_module = {
    input: 'src/index.tsx',
    external: ['@playcanvas/observer', 'react', 'prop-types'],
    output: {
        dir: `react/dist/module`,
        format: 'esm',
        entryFileNames: '[name].mjs',
        globals: {
            'react': 'React'
        },
        preserveModules: true
    },
    plugins: [
        nodeResolve(),
        typescript({
            tsconfig: 'react/tsconfig.json',
            clean: true
        })
    ],
    treeshake: 'smallest',
    cache: false
};

const styling = {
    input: 'src/scss/index.js',
    output: {
        file: 'styling/dist/index.mjs',
        format: 'esm'
    },
    plugins: [
        nodeResolve(),
        sass({
            insert: true,
            output: false
        })
    ]
}

export default (args) => {
    if (process.env.target === 'es6') {
        return [module];
    } else if (process.env.target === 'react:es6') {
        return [react_module];
    } else if (process.env.target === 'styling') {
        return [styling];
    }
    return [module, react_module, styling];
};