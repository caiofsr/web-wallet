/**
 * Updates the constraints of a forwarded properties
 * @example
 * Replace<OperatorProps, { createdAt?: Date; updatedAt?: Date }>
 *
 * Originally the properties passed were required in the interface
 */
export type Replace<T, R> = Omit<T, keyof R> & R;
