<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	import { BTree } from '$lib/components/TreeView/BTree';

	BTree;

	let tree: BTree;

	const data = [
		{
			type: 'dir',
			label: 'root',
			id: 'root',
			children: [
				{
					type: 'page',
					isIndex: true,
					label: '1 Earth',
					id: 'p-0'
				},
				{
					type: 'dir',
					label: 'Gas giants',
					id: 'gas-giants',
					children: [
						{
							type: 'page',
							label: '2 Jupiter',
							id: 'jup'
						},
						{
							type: 'page',
							label: '3 Neptune',
							id: 'nept'
						},
						{
							type: 'page',
							label: '4 Saturn',
							id: 'sat'
						},
						{
							type: 'page',
							label: '5 Uranus',
							id: 'ura'
						},
						{
							type: 'dir',
							label: 'Some other stuff',
							id: 'other',
							children: [
								{
									type: 'page',
									label: 'Item 1',
									id: 'i-1'
								},
								{
									type: 'page',
									label: 'Item 2',
									id: 'i-2'
								},
								{
									type: 'page',
									label: 'Item 3',
									id: 'i-3'
								}
							]
						}
					]
				},
				{
					type: 'dir',
					label: 'Empty',
					id: 'empty',
					children: []
				}
			]
		}
	];

	onMount(() => {
		tree.setData(data);
	});
</script>

<h1>Home</h1>
<a href="{base}/link">link</a>

<b-tree bind:this={tree}>aa</b-tree>

<h2>Whereas recognition of the inherent dignity 1234567890.,;</h2>
<p>
	No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full
	equality to a fair and public hearing by an independent and impartial tribunal, in the
	determination of his rights and obligations and of any criminal charge against him. No one shall
	be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to
	attacks upon his honour and reputation. Everyone has the right to the protection of the law
	against such interference or attacks. Gas giants. Just this. In the light of the Sun.
</p>

<style>
	h2 {
		font-family: h3;
		font-size: 2.5rem;
		font-weight: 600;
		line-height: 0.9;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}
</style>
