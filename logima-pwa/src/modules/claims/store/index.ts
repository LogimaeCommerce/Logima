import { Module } from 'vuex'
import actions from './actions'
import RootState from '@logima-pwa/core/types/RootState'
import ClaimsState from '../types/ClaimsState'

export const module: Module<ClaimsState, RootState> = {
  namespaced: true,
  actions
}

