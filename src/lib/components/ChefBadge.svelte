<script>
  export let chef
  export let index = 0
</script>

<div class="chef-badge" style="animation-delay: {index * 0.1}s">
  <div class="chef-badge-avatar">👨‍🍳</div>
  <div class="chef-badge-info">
    <p class="chef-badge-name">{chef.name}</p>
    <p class="chef-badge-title">{chef.title}</p>
  </div>
  <div class="chef-badge-tags">
    {#each chef.specialty.slice(0, 2) as tag}
      <span class="chef-badge-tag">{tag}</span>
    {/each}
  </div>
</div>
