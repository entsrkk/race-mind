/**
 * Simple cn utility that merges classes without external dependencies.
 */
export function combineClasses(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}