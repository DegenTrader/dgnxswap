export class Utils {
  /**
   * @description Compare two objects for equality.
   * @param object1 First object to compare.
   * @param object2 Second object to compare.
   */
  public compareObjects(object1: object, object2: object): boolean {
    return JSON.stringify(object1) === JSON.stringify(object2);
  }
}
