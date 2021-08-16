<template>
  <div class="row w-100">
    <h1>Current Bugs:</h1>
  </div>
  <br />
  <div class="row justify-content-around">
    <div v-if="bugs" class="col-md-6 action m-3">
      <BugCard
        v-for="b in bugs"
        :key="b.id"
        :bug="b"
      />
    </div>
    <div v-else class="col-6">
      <!-- <LoaderComponent /> -->
    </div>
    <div class=" card col-md-5 mt-2 h-25" id="new-bug-form">
      <form @submit.prevent="createBug">
        <div class="form-group">
          <label for="bug-name">Bug Title</label>
          <input type="text"
                 class="form-control"
                 required
                 id="bug-name"
                 aria-describedby="bug-title"
                 v-model="state.newBug.title"
          >
        </div>
        <div class="form-group">
          <label for="bug-description">Description</label>
          <textarea class="form-control" required id="bug-description" v-model="state.newBug.description" />
        </div>
        <button type="submit" class="btn btn-primary" title="create bug">
          + CREATE
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const router = useRouter()
    const state = {
      newBug: {
        title: '',
        description: ''
      }
    }
    onMounted(async() => {
      try {
        await bugsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    )
    return {
      state,
      BugDetailsPage(id) {
        router.push({ name: 'BugDetails', params: { id: id } })
      },
      async createBug() {
        const id = await bugsService.create(state.newBug)
        router.push({ name: 'BugDetails', params: { id: id } })
      },
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style></style>
