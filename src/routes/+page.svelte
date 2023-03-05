<script lang="ts">
  import { session } from "$lib/stores";
  import { resumeSession } from "$lib/client";
  import SignInForm from "$lib/components/signin_form.svelte";
  import PostForm from "$lib/components/post_form.svelte";
  import Timeline from "$lib/components/timeline.svelte";
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .container > .center {
    flex: 700px;
  }
  .container > .left, .right {
    flex: 0px;
  }
</style>

<div class="container">
  <div class="left"></div>
  <div class="center">
  {#await resumeSession()}
    <div>loading...</div>
  {:then}
    {#if !$session}
      <SignInForm />
    {:else}
      <PostForm />
      <Timeline />
    {/if}
  {/await}
  </div>
  <div class="right"></div>
</div>
