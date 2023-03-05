<script lang="ts">
  import { timeline } from "$lib/stores";
  import { refresh } from "$lib/client";
  import Post from "$lib/components/post.svelte";
</script>

<div class="to-right">
  <button class="refresh-button" on:click={refresh}>Refresh</button>
</div>
{#await refresh()}
  <div>loading...</div>
{:then}
  <div class="timeline">
    {#if $timeline}
      {#each $timeline.feed as post}
        <Post post={post} />
      {/each}
    {/if}
  </div>
{/await}
