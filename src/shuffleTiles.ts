import {puzzlesDataModel} from './puzzle-game';

export function shuffleTiles(array: Array<puzzlesDataModel>): Array<puzzlesDataModel> {
  const result = [...array];
  return result.sort(() => Math.random() - 0.5);
}