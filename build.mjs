import * as esbuild from 'esbuild';
import path from "path";

const ctx = await esbuild.context({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outfile: 'dist/main.js',
    format: 'esm',
    sourcemap: true,
    target: 'esnext',
    jsx: 'automatic',
    jsxImportSource: 'preact',
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    define: { 'process.env.NODE_ENV': '"development"' }
});

await ctx.watch(); // <--- live rebuild on file changes

console.log('Watching for changes...');