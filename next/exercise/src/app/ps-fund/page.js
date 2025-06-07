import {v4 as uuid} from 'uuid';
import {
  LexoDecimal,
  LexoNumeralSystem36,
  LexoNumeralSystem64,
  LexoRank,
} from 'lexorank';
import LexoRankBucket from 'lexorank/lib/lexoRank/lexoRankBucket.js';

export default function index(params) {
  const lexoRank = LexoRank.middle();
  const lexoRank2 = LexoRank.min();
  let t = LexoRank.parse('0|8zzzzz:').genNext();
  // for (let i = 0; i < 110; i++) {
  //   t = t.genNext();
  //   console.log(t.format());
  // }
  // console.log(LexoRank.max().genNext().format());

  let system = new LexoNumeralSystem64();
  console.log(LexoDecimal.parse('1000000', LexoRank.NUMERAL_SYSTEM));
  console.log(LexoDecimal.parse('1000000', system));
  console.log(LexoDecimal.parse('10000000000000000', system));

  let r = new LexoRank(LexoRankBucket.BUCKET_0,
      LexoDecimal.parse('10000000000000000:', LexoRank.NUMERAL_SYSTEM));
  let d = LexoDecimal.parse('50000000000000000:', system);

  // for (let i = 0; i < 200; i++) {
  //   let t = d.subtract(LexoDecimal.parse('1', system));
  //   let m = LexoRank.between(t, d);
  //   console.log(m.format());
  //   console.log(LexoRank.between(m, d).format());
  //   d = t;
  //   console.log(d.format());
  // }

  let l1 = LexoRank.parse('0|8zzzzz:');
  let l2 = LexoRank.parse('0|900000:');
  console.log(l1.between(l2).format());
  console.log(l1.between(l2).genNext().format());

  return (
    <>
      <h1>UUID: {uuid()}</h1>
      <h1>UUID: {uuid()}</h1>
      <h1>L: {lexoRank.format()}</h1>
      <h1> {t.format()}</h1>
      <h1> {t.genNext().format()}</h1>
      <h1> {t.genNext().genNext().between(t).format()}</h1>
      <h1>LexoRank: {lexoRank.between(lexoRank2).format()}</h1>
      <h1>L: {lexoRank2.genNext().format()}</h1>
      <h1>L: {lexoRank2.genNext().genNext().format()}</h1>
    </>
  );
}
