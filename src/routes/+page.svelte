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
