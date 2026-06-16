import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'liforma-docs-theme';

function systemPrefersDark(): boolean {
	return browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
	if (theme === 'system') {
		return systemPrefersDark() ? 'dark' : 'light';
	}
	return theme;
}

function applyTheme(resolved: 'light' | 'dark'): void {
	if (!browser) return;
	document.documentElement.dataset.theme = resolved;
}

export function initTheme(): void {
	if (!browser) return;
	const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';
	applyTheme(resolveTheme(stored));

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		const current = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';
		if (current === 'system') {
			applyTheme(resolveTheme('system'));
		}
	});
}

export function getStoredTheme(): Theme {
	if (!browser) return 'system';
	return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system';
}

export function setTheme(theme: Theme): void {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, theme);
	applyTheme(resolveTheme(theme));
}

export function toggleTheme(): void {
	const current = getStoredTheme();
	const resolved = resolveTheme(current);
	setTheme(resolved === 'dark' ? 'light' : 'dark');
}

export function isDarkMode(): boolean {
	if (!browser) return false;
	return document.documentElement.dataset.theme === 'dark';
}
