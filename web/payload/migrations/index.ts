import * as migration_20260409_155734_initial from './20260409_155734_initial';
import * as migration_20260901_053726_cms_collections from './20260901_053726_cms_collections';
import * as migration_20260902_puck_pages from './20260902_puck_pages';

export const migrations = [
  {
    up: migration_20260409_155734_initial.up,
    down: migration_20260409_155734_initial.down,
    name: '20260409_155734_initial',
  },
  {
    up: migration_20260901_053726_cms_collections.up,
    down: migration_20260901_053726_cms_collections.down,
    name: '20260901_053726_cms_collections'
  },
  {
    up: migration_20260902_puck_pages.up,
    down: migration_20260902_puck_pages.down,
    name: '20260902_puck_pages',
  },
];
