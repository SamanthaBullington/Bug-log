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
          <div class="action hoverable d-flex justify-content-end pr-5" v-if="account.id === bug.creatorId" @click.stop="editBug">
            <span class="btn btn-danger">X Edit Bug</span>
          </div>
          <small>
            <p class="card-text">
              Updated on: {{ updatedDate }}
            </p>
          </small>
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
import { useRoute, useRouter } from 'vue-router'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }

  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async deleteBug(id) {
        await bugsService.delete(id)
        router.push({ name: 'Bugs' })
      },
      updatedDate: computed(() => {
        const bug = AppState.bugs.find(b => b.id === route.params.id)
        const d = new Date(bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
      }),
      async editBug(id) {
        await bugsService.editBug(id)
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
