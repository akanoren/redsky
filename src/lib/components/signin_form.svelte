<script lang="ts">
  import { signin } from "$lib/client";
</script>

<form name="signin" method="POST" on:submit|preventDefault={signin}>
  <label for="signin-identifier">Email Address</label>
  <input id="signin-identifier" name="identifier" type="email" />
  <label for="signin-password">Password</label>
  <input id="signin-password" name="password" type="password" />
  <input type="submit" value="Sign In" />
</form>
