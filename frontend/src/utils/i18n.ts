/**
 * Given a locale code, return the language name of another locale
 */
export function getLocaleName(
  fromCode: string,
  toCode = "en"
): string | undefined {
  return new Intl.DisplayNames([toCode], {
    type: "language",
    languageDisplay: "standard"
  })
    .of(fromCode)
    ?.toLowerCase();
}

/**
 * Given a locale code, return the language name in that locale
 */
export function getLocaleNativeName(code: string): string | undefined {
  return getLocaleName(code, code);
}

/**
 * Given a locale only return the first 2 letters (i.e. en-US -> en)
 */
export function getLocaleShort(code: string): string {
  return code.split("-")[0];
}
