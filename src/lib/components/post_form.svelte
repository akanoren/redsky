<script lang="ts">
  import { post } from "$lib/client";
</script>

<form name="post" method="POST" on:submit|preventDefault={post}>
  <textarea name="text" />
  <div class="to-right">
    <input type="submit" value="Post" />
  </div>
</form>
