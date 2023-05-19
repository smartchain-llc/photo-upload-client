<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import type { ByteValue } from './BinaryData';
  import { bytesPerRow } from './BinaryData';
  import BinaryValue from './BinaryValueDiv.svelte';

  export let binaryDataStr: string;
  let binaryData: ByteValue[] = [];

  onMount(() => {
    const matchedData = binaryDataStr.match(/[0-9a-fA-F]{2}/g) || []; // split the binary data into byte values
    // const matchedData = binaryDataStr.match(/.{1,2}/g) || [];
    if(matchedData.length > 0) {
      matchedData.forEach((byte, index) => {
        binaryData.push({text: byte, offset: index * 2, value: parseInt(byte, 16)})
      })      
    }
    console.log(binaryData)

  });
</script>

<div style="width: 400px; height: 400px; overflow: auto;">
  {#each binaryData as {text, offset, value}}
    <BinaryValue byteValue={text} />
  {/each}
</div> -->
<script lang="ts">
  import { onMount } from 'svelte';
  import BinaryValue from './BinaryValueDiv.svelte';
  import type { ByteValue } from './BinaryData';
  import { bytesPerRow } from './BinaryData';

  export let binaryDataStr: string;

  let byteValues: string[] = [];
  let binaryData: ByteValue[] = [];
  
  onMount(() => {
    byteValues = binaryDataStr.match(/[0-9a-fA-F]{1,2}/g) || []; // split the binary data into byte values
    binaryData = byteValues.map((byteStr, index) => {
      return { text: byteStr, offset: index / 2, value: parseInt(byteStr, 16)}
    })
  });
</script>
<div style="width: calc({$bytesPerRow} * 34px);">
  {#each binaryData as byte }
    <BinaryValue {byte}/>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    border-radius: 5px;
    border-width: 2px;
    border-style: solid;
    border-color: lightgrey;
    width: calc(); 
    overflow: auto;
  }
</style>