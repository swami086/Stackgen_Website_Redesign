import * as migration_20260409_155734_initial from './20260409_155734_initial';
import * as migration_20260901_053726_cms_collections from './20260901_053726_cms_collections';

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
];
