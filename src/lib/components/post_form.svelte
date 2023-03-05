<script lang="ts">
  import { post } from "$lib/client";
</script>

<style>
  form {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea[name=text] {
    width: 100%;
    height: 100px;
    font-size:17px;
    margin: 0px 0px 20px 0px;
    padding:17px 15px 17px 15px;
    border-radius: 20px;
  }

  .to-right {
    width: 100%;
    display: flex;
    justify-content: end;
  }

  input[type="submit" i]{
    width: 10em;
    border-color: #00acee;
    background-color: #00acee;
    border-radius: 20px;
    padding:5px 15px 5px 15px;
    color: #FFFFFF;
  }

  input[type="submit" i]:hover{
    background-color: #0095d6;
    border-color: #0095d6;
  }
</style>

<form name="post" method="POST" on:submit|preventDefault={post}>
  <textarea name="text" />
  <div class="to-right">
    <input type="submit" value="Post" />
  </div>
</form>
