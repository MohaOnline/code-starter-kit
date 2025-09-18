import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {LexoRank} from "lexorank";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 返回随机整数
 *
 * @param min
 * @param max
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 计算排序权重。
 */
export function getWeight(weight1: string = '', weight2: string = '') {

  if (!weight1 && !weight2) {
    return LexoRank.middle().format();
  } else if (!weight1) {
    const lexoRank2 = LexoRank.parse(weight2);
    return lexoRank2.genNext().format();
  } else if (!weight2) {
    const lexoRank1 = LexoRank.parse(weight1);
    return lexoRank1.genPrev().format();
  } else {
    const lexoRank1 = LexoRank.parse(weight1);
    const lexoRank2 = LexoRank.parse(weight2);
    return lexoRank1.between(lexoRank2).format();
  }
}

export function getWeights(weight1: string = '', weight2: string = '', number: number = 3) {
  let weights = [];
  if (!weight1 && !weight2) {
    let weight = LexoRank.middle();
    for (let i = 0; i < number; i++) {
      weights.push(weight.format());
      weight = weight.genNext();
    }
  } else if (!weight1) {
    let weight = LexoRank.parse(weight2).genNext();
    for (let i = 0; i < number; i++) {
      weights.push(weight.format());
      weight = weight.genNext();
    }
  } else if (!weight2) {
    let weight = LexoRank.parse(weight1).genPrev();
    for (let i = 0; i < number; i++) {
      weights.push(weight.format());
      weight = weight.genPrev();
    }
  } else {
    for (let i = 0; i < number; i++) {
      const weight = getWeight(weight1, weight2);
      weights.push(weight);
      if (i % 2 === 0) {
        weight1 = weight;
      } else {
        weight2 = weight;
      }
    }
  }

  return weights;
}
