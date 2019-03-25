import { GetterTree } from 'vuex'
import CheckoutState from '../../types/CheckoutState'
import RootState from '@logima-pwa/core/types/RootState'

const getters: GetterTree<CheckoutState, RootState> = {
  isThankYouPage: state => state.isThankYouPage
}

export default getters
