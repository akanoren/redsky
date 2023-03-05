<script lang="ts">
  import { post } from "$lib/client";
</script>

<form name="post" method="POST" on:submit|preventDefault={post} style="margin-bottom: 20px">
  <textarea name="text" style="width: 95%; height: 100px;" />
  <input type="submit" value="Post" />
</form>
