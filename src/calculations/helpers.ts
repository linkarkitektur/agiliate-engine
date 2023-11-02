import { ISpace } from './interfaces/space'

/**
 * This function returns the space information from an array of space spaces. Recursively until found.
 * @param {string} spaceClassName - The name of the space
 * @param {ISpace[]} spaces - The array of spaces
 * @returns {ISpace|void}
 */
const findSpace = (spaceClassName: string, spaces: ISpace[]): ISpace|void => {  
  for (const space of spaces) {
    if (space.className === spaceClassName) {
      return space
    } else if (space.spaces) {
      const foundSpace = findSpace(spaceClassName, space.spaces)
      if (foundSpace) {
        return foundSpace
      }
    }
  }
}

export { findSpace }
