<script lang="ts">
	let weight = '600';
</script>

<h2 class="up" style="font-weight:{weight};">
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
<h3 style="font-weight:{weight};">Whereas recognition of the inherent dignity 1234567890.</h3>
<p>
	No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full
	equality to a fair and public hearing by an independent and impartial tribunal, in the
	determination of his rights and obligations and of any criminal charge against him. No one shall
	be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to
	attacks upon his honour and reputation. Everyone has the right to the protection of the law
	against such interference or attacks. Gas giants. Just this. In the light of the Sun.
</p>
<p>
	<button class="btn" variant="primary"><span class="i-shopping_cart" />Find out more</button>
	<button class="btn"><span>Something else £45.92</span><span class="dot" /></button>
</p>
<p>
	<input type="range" bind:value={weight} min="400" max="700" />
	<span>{weight}</span>
</p>

<style>
	h2,
	h3 {
		color: rgb(93, 93, 93);
		color: var(--color-primary-2);
	}
	h2 {
		font-family: var(--font-family-header);
		font-size: 2.5rem;
		font-optical-sizing: auto;
		font-weight: 600;
		/* font-style: italic; */
		line-height: 1;
		margin-bottom: 0.25rem;
	}
	h3 {
		font-size: 2rem;
		font-style: italic;
		line-height: 1.15;
	}

	h2.up {
		text-transform: uppercase;
	}

	p {
		margin-bottom: 2.5rem;
	}

	button.btn {
		zfont-family: var(--font-family-body);
		text-transform: uppercase;
		font-weight: 600;
		font-size: 1.25rem;
		margin-right: 1rem;
		zline-height: 1rem;
		letter-spacing: 0.05rem;
	}

	.dot {
		width: 1rem;
		height: 0.1rem;
		background-color: #666;
	}
</style>
