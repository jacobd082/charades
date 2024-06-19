<script>
    import { teamA, teamB, isTeamATurn } from "$lib/score.js"
    import { easy, medium, hard, challenge } from "$lib/wordlists.js"
	import { onMount } from "svelte"
    import { goto } from "$app/navigation"


</script>

<div style="text-align: center;">
    <h1>It's {$isTeamATurn ? "Team A" : "Team B"}'s turn.</h1>
    <p>Pick a difficulty.</p>
    <p><button on:click={() => {goto('/word/easy')}} style="font-size: x-large;text-decoration:none;color:white;background:green;width:300px;border:none;padding:10px;border-radius:15px;">Easy</button></p>
    <p><button on:click={() => {goto('/word/medium')}} style="font-size: x-large;text-decoration:none;color:white;background:orange;width:300px;border:none;padding:10px;border-radius:15px;">Medium</button></p>
    <p><button on:click={() => {goto('/word/hard')}} style="font-size: x-large;text-decoration:none;color:white;background:red;width:300px;border:none;padding:10px;border-radius:15px;">Hard</button></p>
    <p><button on:click={() => {goto('/word/challenge')}} style="font-size: x-large;text-decoration:none;color:white;background:black;width:300px;border:none;padding:10px;border-radius:15px;">Challenge</button></p>
</div>