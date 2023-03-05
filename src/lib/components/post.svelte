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

<div style="margin-top: 1em; border-top-style: solid; border-color: gray; border-top-width: 1px; padding: 0.5em;">
  <div style="margin-bottom: 0.5em; font-weight: bold">{post.post.author.displayName}</div>
  <div>
    <div style="margin-left: 1em;">{getText(post)}</div>
  </div>
</div>
