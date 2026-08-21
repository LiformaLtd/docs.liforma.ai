<script lang="ts">
	import DocPage from '$lib/components/DocPage.svelte';
</script>

<DocPage
	title="Alpha"
	description="Unlisted preview docs. These pages are not in the sidebar or sitemap."
	noindex
>
	<p>
		These notes document APIs that are shipping but are not part of the public integrator contract
		yet. Anyone with the URL can read them. Do not treat this index as supported product
		documentation.
	</p>

	<h2>Pages</h2>
	<ul>
		<li>
			<a href="/_alpha/programmatic-experience-creation">Programmatic experience creation</a>
			— create characters, places, and experiences over
			<code>/v1</code>, including path slugs and attributes.
		</li>
	</ul>
</DocPage>
