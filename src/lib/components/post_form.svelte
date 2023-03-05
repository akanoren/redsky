<script lang="ts">
  import { post } from "$lib/client";
</script>

<style>
  form {
    margin-bottom: 20px;
  }
  form > textarea[name=text] {
    width: 95%;
    height: 100px;
  }
</style>

<form name="post" method="POST" on:submit|preventDefault={post}>
  <textarea name="text" style="" />
  <input type="submit" value="Post" />
</form>
