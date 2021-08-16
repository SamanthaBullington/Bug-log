<template>
  <BugDetailsCard :bug="currentBug" />
</template>

<script>

import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await bugsService.getOneBugById(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug),
      async deleteBug(id) {
        await bugsService.delete(id)
      }
    }
  }
}
</script>

<style>
.bug-style{
  margin: 1px;
  padding: 1px;
  border: 3px;
  border-color: black;
}
</style>
