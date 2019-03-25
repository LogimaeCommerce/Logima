import { cmsPageModule } from './store/page'
import { cmsBlockModule } from './store/block'
import { cmsHierarchyModule } from './store/hierarchy'
import { createModule } from '@logima-pwa/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { plugin } from './store/plugin'
import { initCacheStorage } from '@logima-pwa/core/helpers/initCacheStorage';

export const KEY = 'cms'
export const cacheStorage = initCacheStorage(KEY)
export const Cms = createModule({
  key: KEY,
  store: { modules: [
    { key: 'cmsPage', module: cmsPageModule },
    { key: 'cmsBlock', module: cmsBlockModule },
    { key: 'cmsHierarchy', module: cmsHierarchyModule }
  ], plugin },
  beforeRegistration
})
