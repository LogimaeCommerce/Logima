import { GetterTree } from 'vuex'
import RootState from '@logima-pwa/core/types/RootState'
import PromotedOffersState from '../types/PromotedOffersState'

const getters: GetterTree<PromotedOffersState, RootState> = {
  getPromotedOffers: state => {
    return state.banners
  },
  getHeadImage: state => state.headImage
}

export default getters
