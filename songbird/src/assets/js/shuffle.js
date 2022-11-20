export default function shuffle(array) {
  const random = array.map(Math.random);
  array.sort((a, b) => random[a.id] - random[b.id]);
  return array;
}
