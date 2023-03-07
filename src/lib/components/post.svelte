<script lang="ts">
  import type { AtpAgent } from "@atproto/api";
  import TimeAgo from 'javascript-time-ago';
  import en from 'javascript-time-ago/locale/en';
  import Autolinker from 'autolinker';

  TimeAgo.addDefaultLocale(en)
  const autolinker = new Autolinker({newWindow: true, hashtag: 'twitter'});

  type Post = Awaited<ReturnType<InstanceType<typeof AtpAgent>['api']['app']['bsky']['feed']['getTimeline']>>['data']['feed'][number];

  export let post: Post;

  const timeAgo = new TimeAgo('en-US');

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
  <div class="avatar">
    <img src={post.post.author.avatar} alt=""/>
  </div>
  <div class="name">
    {post.post.author.displayName}
    <span class="time">
      {timeAgo.format(new Date(post.post.indexedAt))}
    </span>
  </div>
  <div class="message">
    <div>{@html autolinker.link(getText(post) || '')}</div>
  </div>
</div>
