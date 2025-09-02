/**
 * Compares a URL path against a route pattern.
 * @path The actual URL path (e.g '/chats/123').
 * @pattern The route pattern to match against (e.g '/chats/:id').
 * @returns True if the path matches the pattern.
 */
export function matchPath(path: string, pattern: string): boolean {
  /**
   * Create a regular expression from the pattern.
   * 1. pattern.replace(/:[^/]+/g, "([^/]+)")
   *  - It finds all occurrences of /:paramName (e.g :id).
   *  - :[^/]+ matches a colon followed by any character that is NOT a slash.
   *  - It replaces each match with "([^/]+)", which is a regex capture group.
   *    This group will match and capture the actual value from the URL (like "123").
   * 2. new RegExp(`^...$`)
   *  - The ^ and $ anchors ensure the entire path must match the pattern,
   *    not just a part of it.
   */
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, "([^/]+)")}$`);
  /* .test(path) executes the regex against the path and returns true or false. */
  return regex.test(path);
}

export function updateParams(
  prev: string,
  next: string,
): Record<string, string> | null {
  /* Getting the names of the parameters from path string (e.g., 'id') */
  const paramNames: string[] = [];
  const regexPath = prev.replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    /* Replacing the param name with a regex capture group */
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

/**
 * Extracts dynamic parameters from a URL path based on a route pattern.
 * @path The actual URL path (e.g '/chats/123').
 * @pattern The route pattern to match against (e.g '/chats/:id').
 * @returns A record of parameter keys and their values (e.g { id: '123' }).
 */
export function extractParams(
  path: string,
  pattern: string,
): Record<string, string> {
  const params: Record<string, string> = {};

  /* Finding all parameter names in the pattern (e.g., [':id', ':section']) */
  const paramNames = pattern.match(/:[^/]+/g) || [];

  /* Creating a regex from the pattern to capture the values from the path */
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, "([^/]+)")}$`);

  /* Executin the regex against the path */
  const matches = regex.exec(path);

  if (matches) {
    /* Starting from index 1, as matches[0] is the full matched string */
    paramNames.forEach((name, index) => {
      /* Removign the leading colon from the param name (':id' -> 'id') */
      const key = name.substring(1);
      params[key] = matches[index + 1];
    });
  }

  return params;
}
