<template>
  <div class="col-4">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">
          {{ bug.title }}
        </h5>
        <p class="card-text">
          {{ bug.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
// import { bugsService } from '../services/BugsService'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style></style>
