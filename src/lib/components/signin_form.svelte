<script lang="ts">
  import { signin } from "$lib/client";
</script>

<form name="signin" method="POST" on:submit|preventDefault={signin}>
  <input name="identifier" type="email" />
  <input name="password" type="password" />
  <input type="submit" value="Sign In" />
</form>
