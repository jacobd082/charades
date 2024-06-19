
<script>
	import { teamA, teamB, isTeamATurn } from "$lib/score.js"
	import { easy, medium, hard, challenge } from "$lib/wordlists.js"
	import { onMount } from "svelte"
	import { goto } from "$app/navigation"
	import Timer from "../Timer.svelte"

	let isTimerStarted = false

	let isTimerFinished = false

	let isCorrect = false

	let selectedWord = ""

	let definition

	onMount(() => {
		selectedWord = get_random($easy)

		try {
			fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
			).then(async (result) => {
				try {
					const json = await result.json()
					definition = ""
					console.log(json)
					json.forEach((word) => {
						word.meanings.forEach((meaning) => {
							if (meaning.partOfSpeech == "noun") {
								meaning.definitions.forEach((wordDefinition) => {
									definition += `<li>${wordDefinition.definition}</li>`
								})
							}
						})
					})
					definition = definition
				} catch (error) {
					console.error(error)
					definition = "Error Occurred while getting definition"
				}
			})
		} catch (error) {
			definition = "Error Occurred while getting definition"
		}
	})

	function get_random(list) {
		return list[Math.floor(Math.random() * list.length)]
	}
</script>

{#if !isTimerStarted}
	<h2>Easy Word</h2>
	<p>Your word is...</p>
	<h1 style="font-size: 5em;margin:0;">{selectedWord}</h1>
	<p style="margin-bottom: 0;"><b>Definitions:</b></p>
	<div style="display: flex;justify-content:space-around;">
		<p style="max-width: 500px;text-align:left;">
			{@html definition ?? "Loading Definition..."}
		</p>
	</div>
	<p>
		<button
			on:click={() => {
				isTimerStarted = true
			}}
			style="font-size: x-large;text-decoration:none;color:white;background:green;width:300px;border:none;padding:10px;border-radius:15px;"
			>Start Timer</button
		>
	</p>
	<p>
		<button
			on:click={() => {
				selectedWord = get_random($easy)

				try {
					fetch(
						`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
					).then(async (result) => {
						try {
							const json = await result.json()
							definition = ""
							console.log(json)
							json.forEach((word) => {
								word.meanings.forEach((meaning) => {
									if (meaning.partOfSpeech == "noun") {
										meaning.definitions.forEach((wordDefinition) => {
											definition += `<li>${wordDefinition.definition}</li>`
										})
									}
								})
							})
							definition = definition
						} catch (error) {
							console.error(error)
							definition = "Error Occurred while getting definition"
						}
					})
				} catch (error) {
					definition = "Error Occurred while getting definition"
				}
			}}
			style="font-size: x-large;text-decoration:none;color:white;background:black;width:300px;border:none;padding:10px;border-radius:15px;"
			>Already used</button
		>
	</p>
{:else}
	{#if !isCorrect}
		<Timer
			on:finish={() => {
				isTimerFinished = true
				$isTeamATurn = !$isTeamATurn
			}}
		/>
	{/if}
	{#if isCorrect}
		<h1>Correct!</h1>
		<p>10 points awarded to Team {$isTeamATurn ? "A" : "B"}!</p>
		<button
			on:click={() => {
				$isTeamATurn = !$isTeamATurn
				goto("/")
			}}
			style="font-size: x-large;text-decoration:none;color:white;background:black;width:300px;border:none;padding:10px;border-radius:15px;"
			>Next Round</button
		>
	{:else}
    {#if !isTimerFinished}
		<button
			on:click={() => {
				if ($isTeamATurn) {
					$teamA += 10
				} else {
					$teamB += 10
				}
				isCorrect = true
			}}
			style="font-size: x-large;text-decoration:none;color:white;background:green;width:300px;border:none;padding:10px;border-radius:15px;"
			>Correct Guess</button
		>
        {/if}
	{/if}
	{#if isTimerFinished}
		<h1>Times Up!</h1>
		<h2>The word was: "{selectedWord}"</h2>
		<p>No points were givin.</p>
		<p>
			<button
				on:click={() => {
					goto("/")
				}}
				style="font-size: x-large;text-decoration:none;color:white;background:black;width:300px;border:none;padding:10px;border-radius:15px;"
				>Next Round</button
			>
		</p>
	{/if}
{/if}
