<script lang="ts">
  import { AtpAgent } from "@atproto/api";
  import type { AtpPersistSessionHandler } from "@atproto/api";
  import Post from "$lib/components/post.svelte";

  const SESSION_KEY = 'session';
  const persistSession: AtpPersistSessionHandler = (_, session) =>
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  type Session = Parameters<AtpPersistSessionHandler>[1];
  type Timeline = Awaited<ReturnType<InstanceType<typeof AtpAgent>['api']['app']['bsky']['feed']['getTimeline']>>['data'];

  const agent = new AtpAgent({ service: 'https://bsky.social', persistSession });
  let session: Session | null;
  let timeline: Timeline | null;

  async function resumeSession() {
    try {
      if (session != null) {
        return
      }
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored == null) {
        return;
      }
      const parsed: Session = JSON.parse(stored);
      if (parsed == null) {
        return;
      }
      const { success } = await agent.resumeSession(parsed);
      if (!success) {
        return;
      }
      session = parsed;
    } catch(ex) {
      console.log({ ex });
      alert(ex);
      return;
    }
  }

  async function signin() {
    try {
      const identifier = document.querySelector<HTMLInputElement>("input[name=identifier]")?.value;
      if (!identifier) {
        alert("identifier should not be blank.");
        return;
      }
      const password = document.querySelector<HTMLInputElement>("input[name=password]")?.value;
      if (!password) {
        alert("password should not be blank.");
        return;
      }
      const { success, data } = await agent.login({ identifier, password });
      if (!success) {
        alert("signing in failed.");
        return;
      }
      session = data;
    } catch(ex) {
      console.error({ error: ex });
      alert("signing in failed.");
      return;
    }
  }

  async function refresh() {
    try {
      const { success, data } = await agent.api.app.bsky.feed.getTimeline();
      if (!success) {
        alert("loading timeline failed.")
        return;
      }
      timeline = data;
    } catch(ex) {
      console.error({ error: ex });
      alert("loading timeline failed");
      return;
    }
  }
</script>

{#await resumeSession()}
  loading...
{:then}
  {#if !session}
    <form method="POST" on:submit|preventDefault={signin}>
      <input name="identifier" type="email" />
      <input name="password" type="password" />
      <input type="submit" value="Sign In" />
    </form>
  {:else}
    {#await refresh()}
      loading...
    {:then}
      <button on:click={refresh}>Refresh</button>
      {#if timeline}
        {#each timeline.feed as post}
          <Post post={post} />
        {/each}
      {/if}
    {/await}
  {/if}
{/await}
