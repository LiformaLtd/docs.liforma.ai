export const SITE_NAME = 'Liforma Docs';
export const SITE_URL = 'https://docs.liforma.ai';
export const DEFAULT_DESCRIPTION =
	'Add intelligent animated avatars to your app in minutes. Real-time AI characters that listen, think, speak, and animate.';

export type PageMeta = {
	readonly title: string;
	readonly description?: string;
	readonly pathname?: string;
};

export function pageTitle(title: string): string {
	return `${title} · ${SITE_NAME}`;
}

export function canonicalUrl(pathname: string): string {
	const path = pathname === '/' ? '' : pathname;
	return `${SITE_URL}${path}`;
}

export function ogImageUrl(): string {
	return `${SITE_URL}/og-default.svg`;
}
