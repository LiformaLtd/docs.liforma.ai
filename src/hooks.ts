import type { Reroute } from '@sveltejs/kit';

/** SvelteKit ignores `_`-prefixed folders, so map the public /_alpha URLs onto /unlisted/alpha. */
export const reroute: Reroute = ({ url }) => {
	if (url.pathname === '/_alpha' || url.pathname.startsWith('/_alpha/')) {
		return `/unlisted/alpha${url.pathname.slice('/_alpha'.length)}`;
	}
};
