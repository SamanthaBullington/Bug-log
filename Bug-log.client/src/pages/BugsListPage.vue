<template>
  <div class="container-fluid">
    <div class="row c-bugs">
      <h1>Current Bugs:</h1>
      <button class="button button-style" @click="state.filter = !state.filter">
        Filter Bugs
      </button>
    </div>
    <div class="row">
      <div>
      </div>
      <div v-if="!state.filter" class="col-md-7 action mt-3 bug-style ">
        <div v-if="bugs ">
          <BugCard
            v-for="b in bugs"
            :key="b.id"
            :bug="b"
          />
        </div>
      </div>
      <div v-else class="col-md-7 action mt-3 bug-style ">
        <div>
          <BugCard
            v-for="b in filterBugs"
            :key="b.id"
            :bug="b"
          />
        </div>
      </div>
      <!-- <div v-else class="col-4">
        <LoaderComponent />
      </div> -->
      <div class=" card col-md-4 mt-5 ml-5 pb-2 pt-2  mr-1 h-25" id="new-bug-form">
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
          <button type="submit" class="btn btn-success" title="create bug">
            + CREATE
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      newBug: {
        title: '',
        description: ''
      },
      filter: false
    })
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
      bugs: computed(() => AppState.bugs),
      filterBugs: computed(() => AppState.bugs.filter(b => !b.closed))
      // FIXME create computed for AppState.bugs where you filter on closed === false
    }
  }
}
</script>

<style>
.c-bugs{
  background-color: #d40000 ;
}

.button-style {
  background-color: rgb(0, 0, 0);
  border: none;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  border-color:#d40000
}

  </style>
