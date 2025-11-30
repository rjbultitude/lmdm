export function getNote({
  rootNote,
  ratio
}) {
  return rootNote * ratio.fraction;
}