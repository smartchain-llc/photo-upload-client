<script lang='ts'>
  import { onMount } from "svelte";
  import type { Photo } from "./Files";
  
  export let file: Photo
  let loading = "yellow"
  file.bytes().then(data => {
    loading = 'green'
  },
  err => {
    loading = 'red'
  }
  )
</script>

<div class="file-container">
  <div 
    class="photo-file"
    style:border-color={'green'}
  >
    <div class="filename">
      {file.name}
    </div>
    <div>
      {loading}
    </div>
  </div>  
</div>


<style>
  div.photo-file {
    display: grid;
    grid-template-columns: 25% 100%;
    grid-template-rows: 25%;
    width: 150pt;
    height: 50pt;
    border: 2px solid lightblue;
    padding: 5pt;
    margin: 0 5pt 0 5pt;
    overflow-x: hidden;
  }
  div.filename {
    overflow-x: hidden;
    grid-column-start: 1;
    grid-column-end: 3;
    font-size: 10pt;
  }
</style>
