export const isEqual = (a: unknown, b: unknown): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export function updateParams(
  prev: string,
  next: string,
): Record<string, string> | null {
  /* Get the names of the parameters from path string (e.g., 'id') */
  const paramNames: string[] = [];
  const regexPath = prev.replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    /* Replace the param name with a regex capture group */
    return "([^/]+)";
  });

  /* Create a RegExp from the modified path */
  const routeRegex = new RegExp(`^${regexPath}$`);
  const match = next.match(routeRegex);

  if (match) {
    /* If it matches, extract the values and map them to their names */
    return paramNames.reduce<Record<string, string>>((acc, name, index) => {
      /* +1 because match[0] is the full string */
      acc[name] = match[index + 1];
      return acc;
    }, {});
  }

  return null;
}
