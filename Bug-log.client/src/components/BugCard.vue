<template>
  <div class="bug-style">
    <div class="card p-2 ">
      <div class="row">
        <div class="col-md-2">
          <img :src="bug.creator.picture" :alt="bug.creator.name" :title="bug.creator.name">
          <div class="row">
            <small> <p class="pl-3 card-text">
              {{ account.name }}
            </p></small>
          </div>
        </div>
        <div class="col-md-6">
          <router-link :to="{name: 'BugDetails', params: {id:bug.id}}" class="col-8" :title="bug.title + ' Details'">
            <h3 class="m-0 title-style">
              {{ bug.title }}
            </h3>
          </router-link>

          <br />
          <p class="card-text">
            {{ bug.description }}
          </p>
        </div>
        <div class="offset-6">
          <span v-if="!bug.closed" @click="closeBug" class=" mdi mdi-bug-outline open"></span>
          <span v-else class=" mdi mdi-bug-check closed"></span>
        </div>
      </div>
      <!-- <div class="col-4 text-right">
          <DeleteButton @delete="deleteBug(bug.id)" :item-name="bug.title" />
        </div> -->
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
      async closeBug() {
        try {
          await bugsService.closeBug(props.bug.id)
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
  border-style: dotted;
  border-color: black;
}
img{
  border-radius: 50%;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
  padding-right: 0;
  padding-left: 0;
  }

  .card{
    background-color: dimgray;
  }

  .title-style{
    text-shadow: 2px 2px black;
  }
.closed{
  color:#d40000;
  text-shadow: 1px 1px black;
  font-size: xx-large;
}
.open{
  color:black;
  font-size: xx-large;

}
</style>
