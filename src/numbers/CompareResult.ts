/** 
 * Represents the possible results of a standard `compare()` function.
 * Note that this only works if the given `compare()` function only
 * returns `1`, `0`, or `-1`. If it can return any number,
 * this enum is insufficient to represent that.
 * 
 * Note that `CompareResult` is always viewed from the perspective
 * of the instance on which the comparison is executed (i.e. not
 * the argument).
 */
enum CompareResult {
    /** The source is less than the compared value. */
    Less = -1,
    /** 
     * The source is equal to the compared value.
     * Note that this does not necessarily mean the two values are identical,
     * just that they are ordered the same.
     */
    Equal = 0,
    /** The source is greater than the compared value. */
    Greater = 1
}

export default CompareResult;
