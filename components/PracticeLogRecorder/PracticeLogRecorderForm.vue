<template>
  <div>
    <div class="inputSection">
      <p class="inputSectionHeader">Instrument</p>

      <select class="input" name="instruments">
        <option value="drums">Drums</option>
        <option value="guitar">Guitar</option>
        <option value="bass">Bass</option>
        <option value="piano">Piano</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="inputSection">
      <p class="inputSectionHeader">Date Practiced</p>
      <input type="datetime-local" class="input" />
    </div>

    <div class="inputSection">
      <p class="inputSectionHeader">Minutes Practiced</p>
      <input type="number" class="input" placeholder="0" />
    </div>

    <div class="inputSection">
      <p class="inputSectionHeader">Notes</p>

      <textarea class="input h-20" />
    </div>
  </div>
</template>

<style>
.inputSectionHeader {
  @apply font-semibold;
}
.inputSection {
  @apply pb-2;
}
</style>
