import { ActionTree } from 'vuex';
import { execute as taskExecute } from '@logima-pwa/core/lib/sync/task'
import * as entities from '@logima-pwa/core/store/lib/entities'

// actions
export const actions: ActionTree<any, any> = {
  fetch ({ commit }, request) {
    const taskId = entities.uniqueEntityId(request)
    request.task_id = taskId.toString()
    return taskExecute(request)
  }
}


