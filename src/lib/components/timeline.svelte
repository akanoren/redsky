<script lang="ts">
  import { timeline } from "$lib/stores";
  import { refresh } from "$lib/client";
  import Post from "$lib/components/post.svelte";
</script>

<style>
  .refresh-button {
    width: 8em;
    border-color: #6A5ACD;
    background-color: #6A5ACD;
    border-radius: 20px;
    padding:5px 15px 5px 15px;
    color: #FFFFFF;
  }

  .to-right {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .timeline {
    margin-top: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5em;
  }
</style>

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
