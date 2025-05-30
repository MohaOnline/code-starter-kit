import {v4 as uuid} from 'uuid';
import {LexoRank} from 'lexorank';

export default function index(params) {
  const lexoRank = LexoRank.middle();
  const lexoRank2 = lexoRank.genNext();
  LexoRank.parse('0|hzzzzz:');

  return (
    <>
      <h1>UUID: {uuid()}</h1>
      <h1>UUID: {uuid()}</h1>
      <h1>L: {lexoRank.format()}</h1>
      <h1>L2: {lexoRank2.format()}</h1>
      <h1>LexoRank: {lexoRank.between(lexoRank2).format()}</h1>
      <h1>L: {lexoRank2.genNext().format()}</h1>
      <h1>L: {lexoRank2.genNext().genNext().format()}</h1>
    </>
  );
}
