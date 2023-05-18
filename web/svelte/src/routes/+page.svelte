<script lang="ts">
  import { writable } from "svelte/store";
  const connected = writable(false)
  const msgText = writable('')
  const msgDialogText = writable('')
  let socket: WebSocket
  const receivedMsgs = writable(new Array<any>)

  function get_socket(): WebSocket {
    return new WebSocket('ws://localhost:9001')
  }
  function connect(_: Event) {
    socket = get_socket()
    socket.addEventListener('open', (event) => {
      $connected = true
    })
    socket.addEventListener('error', () => {
      $connected = false
    })
    socket.addEventListener('message', msg => {
      update_msgBox(msg)
    })
    console.log(socket)
  }
  function sendMsg() {
    socket.send($msgText)
  }
  function update_msgBox(msg: MessageEvent) {
    $msgDialogText += msg.data
  }
</script>

<h1>WebSocket Test</h1>
<button on:click={connect}>{$connected ? "Disconnect" : "Connect"}</button>
{#if $connected}
  <div id="msgs">{$msgDialogText}</div>
  <input type="text" bind:value={$msgText}/>
  <button on:click={sendMsg} disabled={$msgText.length === 0}>Send</button>
{/if}

<style>
  input {
    width: 100pt;
  }
  #msgs {
    width: 300pt;
    height: 200pt;
    border-radius: 5pt;
    border-width: 2pt;
    border-style: solid;
  }
</style>