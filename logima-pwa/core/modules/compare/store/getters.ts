import { GetterTree } from 'vuex'
import RootState from '@logima-pwa/core/types/RootState'
import CompareState from '../types/CompareState'

const getters: GetterTree<CompareState, RootState> = {
  isEmpty: (state) => state.items.length === 0,
  isOnCompare: (state) => (product) => state.items.find(p => p.sku === product.sku),
  isCompareLoaded: state => state.loaded
}

export default getters
