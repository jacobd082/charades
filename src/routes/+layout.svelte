<script>
	import "$lib/main.css"
	import { teamA, teamB } from "$lib/score.js"
	import { easy, medium, hard, challenge } from "$lib/wordlists.js"
    import { onMount } from "svelte";

	let isLoadingWordLists = true

	onMount(async () => {
		const easyFetch = await fetch("/wordlists/easy.txt")
		const easyArray = (await easyFetch.text()).split("\n")
		$easy = easyArray

		const mediumFetch = await fetch("/wordlists/medium.txt")
		const mediumArray = (await mediumFetch.text()).split("\n")
		$medium = mediumArray

		const hardFetch = await fetch("/wordlists/hard.txt")
		const hardArray = (await hardFetch.text()).split("\n")
		$hard = hardArray

		const challengeFetch = await fetch("/wordlists/challenge.txt")
		const challengeArray = (await challengeFetch.text()).split("\n")
		$challenge = challengeArray

		isLoadingWordLists = false
	})
</script>

<nav>
	<h1>Charades</h1>
	<div>
		<p style="color: white;background:red; padding:8px;border-radius:5px;">
			<b>Team A:</b>
			{$teamA}
		</p>
		<p style="color: white;background:blue; padding:8px;border-radius:5px;">
			<b>Team B:</b>
			{$teamB}
		</p>
	</div>
</nav>

<div style="text-align: center;">
	{#if isLoadingWordLists}
		<p style="text-align: center;">Loading Word Lists...</p>
	{:else}
		<slot />
	{/if}
</div>
