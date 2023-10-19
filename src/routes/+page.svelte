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
			children: [
				{
					type: 'page',
					isIndex: true,
					label: '1 Earth'
				},
				{
					type: 'dir',
					label: 'Gas giants',
					children: [
						{
							type: 'page',
							label: '2 Jupiter'
						},
						{
							type: 'page',
							label: '3 Neptune'
						},
						{
							type: 'page',
							label: '4 Saturn'
						},
						{
							type: 'page',
							label: '5 Uranus'
						}
					]
				},
				{
					type: 'dir',
					label: 'Empty',
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
