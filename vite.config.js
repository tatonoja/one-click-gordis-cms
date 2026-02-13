import { defineConfig } from 'vite';
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
	plugins: [
		javascriptObfuscator({
			compact: true,
			controlFlowFlattening: true,
			deadCodeInjection: true,
			stringArray: true,
			stringArrayThreshold: 0.75
		}),
	],
	build: {
		outDir: 'dist',
	}
});