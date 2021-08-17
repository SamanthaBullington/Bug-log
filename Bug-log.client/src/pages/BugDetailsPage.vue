<template>
  <div>
    <BugDetailsCard :bug="currentBug" />
  </div>
  <div>
    <NoteCard v-for="n in notes" :key="n.id" :note="n" />
  </div>
  <div class="col-6">
    <form @submit.prevent="createNote">
      <div class="form-group">
        <label for="note"></label>
        <textarea name="note" id="new-note-textarea" cols="30" rows="10" v-model="state.newNote.body"></textarea>
      </div>
      <button type="submit" class="btn btn-success" title="Create Note">
        ADD NOTE
      </button>
    </form>
  </div>
</template>

<script>

import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {
        body: '',
        bugId: route.params.id
      }
    })
    onMounted(async() => {
      try {
        await notesService.getNotesByBugId(route.params.id)
        await bugsService.getOneBugById(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      state,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs),
      currentBug: computed(() => AppState.currentBug),
      async deleteBug(id) {
        await bugsService.delete(id)
      },
      async createNote() {
        await notesService.create(state.newNote)
        state.newNote = {
          bugId: route.params.bug_id
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
</style>
