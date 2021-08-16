<template>
  <div class="row">
    <div class="bug-style">
      <div class="card ">
        <div class="card-body ">
          <router-link :to="{name: 'BugDetails', params: {id:bug.id}}" class="col-8 card-title" :title="bug.title + ' Details'">
            <h1>
              {{ bug.title }}
            </h1>
          </router-link>
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
      bugs: computed(() => AppState.bugs),
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
