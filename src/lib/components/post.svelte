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

<div class="post">
  <div class="name">{post.post.author.displayName}</div>
  <div class="message">
    <div >{getText(post)}</div>
  </div>
</div>
