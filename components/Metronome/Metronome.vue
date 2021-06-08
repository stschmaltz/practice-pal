<template>
  <div class="flex flex-col text-primaryMainDark">
    <h1 class="font-bold text-2xl pb-3 text-center">Metronome</h1>
    <div class="flex pb-4">
      <div class="pr-2">
        <p class="text-left font-semibold">Time Signature</p>
        <input v-model="timeSignature" type="text" class="w-full" />
      </div>

      <div class="pl-2">
        <p class="text-left font-semibold">BPM</p>
        <input v-model="bpm" type="number" class="w-full" />
      </div>
    </div>
    <Btn @click="toggleRunning">
      {{ running ? 'Stop' : 'Start' }}
    </Btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const metronomeSound = new Audio('../soft-click.wav')
const metronomeUpSound = new Audio('../beep-metronome.flac')

export default Vue.extend({
  data() {
    return {
      bpm: 128,
      running: false,
      count: 0,
      totalCount: 1,
      time: performance.now(),
      timeSignature: '4/4',
    }
  },
  computed: {
    interval(): number {
      return (60 * 1000) / (this.bpm * (this.measure / 4))
    },
    beats(): number {
      return Number(this.timeSignature.split('/')[0])
    },
    measure(): number {
      return Number(this.timeSignature.split('/')[1])
    },
  },
  watch: {
    bpm: 'reset',
    beats: 'reset',
    measure: 'reset',
  },
  mounted() {
    const frame = () => {
      const d = performance.now() - this.time
      if (d / this.totalCount > this.interval) {
        this.tick()
        this.totalCount += 1
      }
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  },
  methods: {
    toggleRunning() {
      this.running = !this.running
      if (this.running) {
        metronomeUpSound.play()
        setTimeout(() => {
          metronomeSound.play()
        }, this.interval)
        this.set(2)
      }
    },
    set(count: number) {
      this.totalCount = count
      this.count = count
      this.time = performance.now()
    },
    reset() {
      this.set(0)
    },
    tick() {
      if (!this.running) {
        return
      }
      if (this.count === this.beats) {
        this.count = 0
      }
      if (this.count === 0) {
        metronomeUpSound.play()
      } else {
        metronomeSound.play()
      }
      this.count += 1
    },
  },
})
</script>
