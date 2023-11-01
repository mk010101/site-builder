<script lang="ts">
	let heading = 'h1';
	let weight = '600';
</script>

<h2 class="up" style="font-family:{heading}; font-weight:{weight};">
	Whereas recognition of the inherent dignity 1234567890.
</h2>
<p>
	No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full
	equality to a fair and public hearing by an independent and impartial tribunal, in the
	determination of his rights and obligations and of any criminal charge against him. No one shall
	be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to
	attacks upon his honour and reputation. Everyone has the right to the protection of the law
	against such interference or attacks. Gas giants. Just this. In the light of the Sun.
</p>
<h2 style="font-family:{heading}; font-weight:{weight};">
	Whereas recognition of the inherent dignity 1234567890.
</h2>
<p>
	No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full
	equality to a fair and public hearing by an independent and impartial tribunal, in the
	determination of his rights and obligations and of any criminal charge against him. No one shall
	be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to
	attacks upon his honour and reputation. Everyone has the right to the protection of the law
	against such interference or attacks. Gas giants. Just this. In the light of the Sun.
</p>
<p>
	<button class="btn" variant="primary" style="font-family: {heading};">Find out more</button>
	<button class="btn" style="font-family: {heading};">Something else</button>
</p>
<p>
	<select bind:value={heading}>
		<option value="h1">h1</option>
		<option value="h2">h2</option>
	</select>

	<input type="range" min="100" max="900" step="10" bind:value={weight} />
	<span>{weight}</span>
</p>

<style>
	:root {
		--header: h1;
	}
	h2 {
		font-family: var(--header);
		font-size: 2.5rem;
		font-optical-sizing: none;
		font-weight: 600;
		/* font-style: italic; */
		line-height: 1;
		margin-bottom: 1rem;
		color: #2e2e2e;
	}

	h2.up {
		text-transform: uppercase;
	}

	p {
		font-family: t1;
		margin-bottom: 2.5rem;
	}

	button.btn {
		font-family: t1;
		text-transform: uppercase;
		/*  font-size: 1.25rem; */
		font-weight: 600;
		margin-right: 1rem;
	}
</style>
