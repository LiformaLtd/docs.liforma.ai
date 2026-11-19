/**
 * Turns one docs page (Starlight MDX) into plain Markdown for the website knowledge pack that the "Talk with Liforma"
 * avatar answers from. Runs at build time only (src/pages/knowledge.json.ts); nothing here ships to the browser.
 *
 * - `{expressions}` and component attributes are evaluated against this site's own modules (snippets, publisher
 *   examples, navigation), so code samples come out exactly as the page shows them.
 * - <CodeBlock> becomes a fenced code block, <Callout> a quote with its title.
 * - Live demos (<Experience>, <ExperienceWidget>, iframes) are dropped: they render an avatar, not text.
 * - Relative links become absolute links on the docs site.
 */
import TurndownService from 'turndown';
import { gfm } from '@joplin/turndown-plugin-gfm';

import * as navigation from '../navigation';
import * as publisherExamples from '../publisherExamples';
import { snippets } from '../snippets';

const scope: Record<string, unknown> = { snippets, ...publisherExamples, ...navigation };
const DROP = new Set(['Experience', 'ExperienceWidget']);

const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Evaluates an MDX expression with this site's modules in scope (build time, this repo's own content only). */
function evalExpr(expr: string): unknown {
	return new Function(...Object.keys(scope), `return (${expr});`)(...Object.values(scope));
}

/** Index just past the JS expression that starts at `open` ('{'), aware of strings and template literals. */
function endOfExpr(s: string, open: number): number {
	let i = open + 1;
	let depth = 1;
	const stack: string[] = [];
	while (i < s.length) {
		const c = s[i]!;
		if (stack.length && stack.at(-1) === '`') {
			if (c === '\\') { i += 2; continue; }
			if (c === '`') { stack.pop(); i += 1; continue; }
			if (c === '$' && s[i + 1] === '{') { stack.push('${'); depth += 1; i += 2; continue; }
			i += 1;
			continue;
		}
		if (c === '"' || c === "'") {
			i += 1;
			while (i < s.length && s[i] !== c) i += s[i] === '\\' ? 2 : 1;
			i += 1;
			continue;
		}
		if (c === '`') { stack.push('`'); i += 1; continue; }
		if (c === '{') depth += 1;
		if (c === '}') {
			depth -= 1;
			if (stack.at(-1) === '${') { stack.pop(); i += 1; continue; }
			if (depth === 0) return i + 1;
		}
		i += 1;
	}
	throw new Error(`unclosed expression: ${s.slice(open, open + 80)}`);
}

/** Parses `<Tag attr="x" attr={expr} />` (or `<Tag ...>`) starting at `start`. */
function parseTag(s: string, start: number) {
	const name = s.slice(start + 1).match(/^[A-Za-z][\w.-]*/)![0];
	let i = start + 1 + name.length;
	const attrs: Record<string, unknown> = {};
	while (i < s.length) {
		while (/\s/.test(s[i]!)) i += 1;
		if (s.startsWith('/>', i)) return { name, attrs, end: i + 2, selfClosing: true };
		if (s[i] === '>') return { name, attrs, end: i + 1, selfClosing: false };
		const attr = s.slice(i).match(/^[\w:-]+/)![0];
		i += attr.length;
		if (s[i] !== '=') { attrs[attr] = true; continue; }
		i += 1;
		if (s[i] === '"' || s[i] === "'") {
			const end = s.indexOf(s[i]!, i + 1);
			attrs[attr] = s.slice(i + 1, end);
			i = end + 1;
		} else if (s[i] === '{') {
			const end = endOfExpr(s, i);
			attrs[attr] = evalExpr(s.slice(i + 1, end - 1));
			i = end;
		}
	}
	throw new Error(`unclosed tag <${name}>`);
}

function mdxToHtml(body: string, page: string, problems: string[]): string {
	let out = '';
	let i = 0;
	while (i < body.length) {
		const c = body[i]!;
		if (c === '<' && /[A-Z]/.test(body[i + 1] ?? '')) {
			const tag = parseTag(body, i);
			if (tag.name === 'CodeBlock') {
				const code = String(tag.attrs.code ?? '').replace(/<\\\//g, '</').replace(/\t/g, '  ');
				out += `\n<pre><code class="language-${String(tag.attrs.lang ?? 'text')}">${escHtml(code)}</code></pre>\n`;
				i = tag.selfClosing ? tag.end : body.indexOf('</CodeBlock>', tag.end) + '</CodeBlock>'.length;
				continue;
			}
			if (DROP.has(tag.name)) {
				i = tag.selfClosing ? tag.end : body.indexOf(`</${tag.name}>`, tag.end) + tag.name.length + 3;
				continue;
			}
			if (tag.name === 'Callout') {
				out += `<blockquote><p><strong>${String(tag.attrs.title ?? tag.attrs.type ?? 'Note')}:</strong></p>`;
				i = tag.end;
				continue;
			}
			problems.push(`${page}: unknown component <${tag.name}> left out`);
			i = tag.end;
			continue;
		}
		if (body.startsWith('</Callout>', i)) { out += '</blockquote>'; i += '</Callout>'.length; continue; }
		if (c === '{') {
			const end = endOfExpr(body, i);
			const expr = body.slice(i + 1, end - 1);
			try {
				const value = evalExpr(expr);
				// Inside an attribute (href={...}) keep it as a quoted value; in text, escape it so it stays text.
				out += /=\s*$/.test(out) ? `"${String(value).replace(/"/g, '&quot;')}"` : escHtml(String(value));
			} catch (e) {
				problems.push(`${page}: could not evaluate {${expr.slice(0, 60)}}: ${e instanceof Error ? e.message : e}`);
			}
			i = end;
			continue;
		}
		out += c;
		i += 1;
	}
	return out;
}

function turndownFor(site: string): TurndownService {
	const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' });
	td.use(gfm);
	td.remove(['iframe', 'link', 'script', 'style']);
	td.remove((n) => n.nodeName.toLowerCase() === 'liforma-experience');
	td.addRule('summary', { filter: 'summary', replacement: (content) => `\n\n**${content.trim()}**\n\n` });
	td.addRule('absoluteLinks', {
		filter: (n) => n.nodeName === 'A' && !!n.getAttribute('href'),
		replacement: (content, n) => {
			const href = (n as HTMLElement).getAttribute('href')!;
			const url = href.startsWith('/') ? site + href : href;
			return content.trim() ? `[${content.trim()}](${url})` : '';
		}
	});
	return td;
}

export type DocsPage = { readonly id: string; readonly title: string; readonly description?: string; readonly body: string };

/** One page as Markdown: `# Title`, description, page link, then the page's sections. */
export function docsPageMarkdown(page: DocsPage, site: string, problems: string[]): { url: string; markdown: string } {
	const body = page.body.replace(/\r\n/g, '\n').replace(/^import\s[^\n]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
	const md = turndownFor(site)
		.turndown(mdxToHtml(body, page.id, problems))
		.replace(/\n{3,}/g, '\n\n')
		.trim()
		// "1\. Mint" -> "1. Mint" in headings only
		.replace(/^(#{1,6} .*)$/gm, (h) => h.replace(/\\([.\-*_#+])/g, '$1'));
	const url = `${site}/${page.id === 'index' ? '' : page.id.replace(/\/index$/, '')}`;
	const markdown = `# ${page.title}\n\n${page.description ? page.description + '\n\n' : ''}Page: ${url}\n\n${md}\n`;
	return { url, markdown };
}
