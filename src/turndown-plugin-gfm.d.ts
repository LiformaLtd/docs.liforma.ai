declare module '@joplin/turndown-plugin-gfm' {
	import type TurndownService from 'turndown';
	/** Tables, strikethrough and task lists (GitHub-flavoured Markdown) for Turndown. */
	export const gfm: TurndownService.Plugin;
}
