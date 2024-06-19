<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { tick } from 'svelte';

  let timeRemaining = 60;
  let timerInterval;
  let isFinished = false;

  const dispatch = createEventDispatcher();

  onMount(() => {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining -= 1;
      } else {
        isFinished = true;
        clearInterval(timerInterval);
        dispatch('finish');
      }
    }, 1000);
  });

  $: if (isFinished) {
    tick().then(() => {
      // Do something when the timer finishes, e.g., play sound
    });
  }
</script>

<style>
  .timer {
    font-size: 10em;
  }

  .finished {
    color: red;
    animation: flash 1s infinite;
  }

  @keyframes flash {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
</style>

<div class="timer {isFinished ? 'finished' : ''}">
  {timeRemaining}
</div>
