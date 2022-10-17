<script setup lang="ts"></script>

<template>
  <nav class="sitemenu__container">
    <ul>
      <li class="nav__item"><a>Explore</a></li>
      <li class="nav__item"><a>Links</a></li>
      <li class="nav__item"><a>Links</a></li>
      <li class="nav__item"><a>Links</a></li>
      <li class="nav__item"><a>Login</a></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.sitemenu__container ul {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav__item {
  list-style: none;
}

.nav__item a {
  color: #b4d3b7;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.nav__item a:hover {
  color: #20e134;
}
</style>
