export function prefersReducedMotion(
  mediaQuery: Pick<MediaQueryList, "matches">,
): boolean {
  return mediaQuery.matches;
}

export function animationShouldRun({
  reducedMotion,
  documentVisible,
  inViewport,
}: {
  reducedMotion: boolean;
  documentVisible: boolean;
  inViewport: boolean;
}): boolean {
  return !reducedMotion && documentVisible && inViewport;
}
