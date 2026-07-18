export function makeFisrtUpperCase(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makeSpaceSeparated(str: string): string {
  if (!str) return str;
  return str.split('_').join(' ');
}

export function makeSingular(str: string): string {
  if (!str) return str;
  return str.endsWith('s') ? str.slice(0, -1) : str;
}

export function replaceServerIntoUiName(str: string): string {
  if (!str) return str;
  if (str === 'form') {
    return 'camper form';
  } else {
    return str;
  }
}
