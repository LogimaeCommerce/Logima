import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@logima-pwa/core/types/RootState'
import AttributeState from '../../types/AttributeState'

export const attributeModule: Module<AttributeState, RootState> = {
  namespaced: true,
  state: {
    list_by_code: {},
    list_by_id: {},
    blacklist: [],
    labels: {}
  },
  getters,
  actions,
  mutations
}
