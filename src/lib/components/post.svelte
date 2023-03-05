<script lang="ts">
  import type { AtpAgent } from "@atproto/api";

  type Post = Awaited<ReturnType<InstanceType<typeof AtpAgent>['api']['app']['bsky']['feed']['getTimeline']>>['data']['feed'][number];

  export let post: Post;

  function getText(post: Post) {
    type Record = Post['post']['record'];
    interface TextRecord extends Record {
      text?: string;
    };
    const record = post.post.record;
    const { text } = record as TextRecord;
    return text;
  }
</script>

<style>
  .post {
    width: 100%;
    border-top-style: solid;
    border-color: gray;
    border-top-width: 1px;
    padding: 0.5em;
  }
  .post > .name {
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  .post > .message {
    margin-left: 1em;
  }
</style>

<div class="post">
  <div class="name">{post.post.author.displayName}</div>
  <div class="message">
    <div >{getText(post)}</div>
  </div>
</div>
