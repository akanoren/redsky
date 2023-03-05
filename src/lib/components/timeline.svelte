<script lang="ts">
  import { timeline } from "$lib/stores";
  import { refresh } from "$lib/client";
  import Post from "$lib/components/post.svelte";
</script>

<button on:click={refresh}>Refresh</button>
{#await refresh()}
  <div>loading...</div>
{:then}
  {#if $timeline}
    {#each $timeline.feed as post}
      <Post post={post} />
    {/each}
  {/if}
{/await}
