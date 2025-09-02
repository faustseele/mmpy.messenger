export type TGuardTrace = "Input.input" | "Input.errorLabel";

export function guardHTMLElement<T extends HTMLElement>(
  trace: TGuardTrace,
  element?: HTMLElement,
): element is T {
  const isValid = element instanceof HTMLElement;

  /* E.g: Input.errorLabel -> className = 'Input', elementName = 'errorLabel' */
  const [className, elementName] = trace.split(".");

  if (!isValid) logError(className, elementName);

  return isValid;
}

function logError(className: string, elementName: string): void {
  console.error(`${elementName} in ${className} is not defined`);
}
