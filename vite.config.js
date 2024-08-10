import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5000,
		fs: {
			allow: [
				'..', // This line allows access to the parent directory of the project root
				path.resolve('../data') // Specifically allow access to the data directory
			]
		}
	}
});
