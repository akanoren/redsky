<script lang="ts">
  import { session } from "$lib/stores";
  import { resumeSession } from "$lib/client";
  import SignInForm from "$lib/components/signin_form.svelte";
  import PostForm from "$lib/components/post_form.svelte";
  import Timeline from "$lib/components/timeline.svelte";
</script>

<style>

</style>

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
