import * as migration_20260208_023247 from './20260208_023247';
import * as migration_20260208_044058 from './20260208_044058';

export const migrations = [
  {
    up: migration_20260208_023247.up,
    down: migration_20260208_023247.down,
    name: '20260208_023247',
  },
  {
    up: migration_20260208_044058.up,
    down: migration_20260208_044058.down,
    name: '20260208_044058'
  },
];
