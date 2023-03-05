<script lang="ts">
  import { signin } from "$lib/client";
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5em;
  }
  form > input, label {
    width: 30em;
  }
  form > input[type="submit" i]{
    border-color: #00acee;
    background-color: #00acee;
    border-radius: 20px;
    padding:5px 15px 5px 15px;
    color: #FFFFFF;
  }
</style>

<form name="signin" method="POST" on:submit|preventDefault={signin}>
  <label for="signin-identifier">Email Address</label>
  <input id="signin-identifier" name="identifier" type="email" />
  <label for="signin-password">Password</label>
  <input id="signin-password" name="password" type="password" />
  <input type="submit" value="Sign In" />
</form>
