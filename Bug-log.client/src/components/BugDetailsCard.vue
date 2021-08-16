<template>
  <div class="row">
    <div class="bug-style">
      <div class="card w-100 ">
        <div class="card-body ">
          <h5 class="card-title">
            {{ bug.title }}
          </h5>
          <p class="card-text">
            {{ bug.description }}
          </p>
          <div class="col-4 text-right">
            <DeleteButton @delete="deleteBug(bug.id)" :item-name="bug.title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { useRouter } from 'vue-router'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }

  },
  setup() {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      async deleteBug(id) {
        await bugsService.delete(id)
        router.push({ name: 'Bugs' })
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
