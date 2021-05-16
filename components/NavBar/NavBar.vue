<template>
  <nav class="navBar">
    <LogoSmall />
    <p class="navTitle">Practice Pal</p>
    <NavLinksSection />
  </nav>
</template>

<style>
.navBar {
  @apply top-0 h-16 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 bg-primaryMain;
}
.navTitle {
  @apply px-5 text-white text-2xl;
}
</style>
