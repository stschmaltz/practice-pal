<template>
  <nav class="navBar">
    <div class="navContent">
      <LogoSmall />
      <p class="navTitle">Practice Pal</p>
      <NavLinksSection />
    </div>
  </nav>
</template>

<style>
.navBar {
  @apply top-0 h-16 absolute z-50 w-full  px-2 py-3 bg-primaryMain max-w-7xl;
}
.navContent {
  @apply flex flex-wrap items-center justify-between m-auto;
}
.navTitle {
  @apply px-5 text-white text-2xl;
}
</style>
