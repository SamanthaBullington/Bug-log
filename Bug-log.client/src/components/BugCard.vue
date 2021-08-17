<template>
  <div class="row">
    <div class="bug-style">
      <div class="card ">
        <div class="card-body ">
          <img :src="bug.creator.picture" :alt="bug.creator.name" :title="bug.creator.name">
          <router-link :to="{name: 'BugDetails', params: {id:bug.id}}" class="col-8 card-title" :title="bug.title + ' Details'">
            <i class="mx-2 mdi btn" :class="[state.closed ? state.openClass : state.closedClass]" @click="changeOpen" :title="state.closed? 'Open' : 'Closed'">
            </i>
            <h1>
              {{ bug.title }}
            </h1>
          </router-link>
          <p class="card-text">
            {{ bug.description }}
          </p>
          <p class="card-text">
            {{ account.name }}
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

import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      closed: props.bug.closed,
      openClass: 'btn-success mdi-progress-check',
      closedClass: 'btn-dark mdi-checkbox-marked-circle'
    })
    return {
      state,
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.bugs),
      async deleteBug(id) {
        await bugsService.delete(id)
      },
      async changeOpen() {
        try {
          state.closed = !state.closed
          await bugsService.editClosed(props.bug, state.closed)
          Pop.toast('Status Changed', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
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
img{
  border-radius: 50%;
}
</style>
