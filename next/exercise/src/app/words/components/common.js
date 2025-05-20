import {createContext} from 'react';
import {atom, useAtom} from 'jotai';

// // 导出的 atom 可以在项目中的任何地方通过 useAtom 或其他 Jotai API 使用，确保状态的一致性。
// export const currentWordIndexAtom = atom(0);
//
// export function useCurrentWordIndex() {
//   const [currentWordIndex, setCurrentWordIndex] = useAtom(currentWordIndexAtom);
//   const nextWord = () => setCurrentWordIndex(current => current + 1);
//   const prevWord = () => setCurrentWordIndex(
//       current => current > 0 ? current - 1 : current);
//
//   return {
//     currentWordIndex,
//     nextWord,
//     prevWord,
//   };
// }
//
// export const IndexUpdateContext = createContext(null);
//
// export function suppressWord() {
//
// }

export const handleKeyDown = (event, status, setStatus) => {
  event.preventDefault();

  if (event.key === 'F5') {
    console.log('F5 被阻止');
  }

  if (event.key === 'ArrowRight') {
    console.debug('next word');

    setStatus({
      ...status, // 复制现有状态
      currentWordIndex: status.currentWordIndex + 1, // 更新 currentWord
    });
  }

  if (event.key === 'ArrowLeft') {
    console.debug('previous word');

    setStatus({
      ...status, // 复制现有状态
      isPlaying: false,
      currentWordIndex: Math.max(0, status.currentWordIndex - 1),
    });
  }

  if (event.key === ' ') {
    console.debug('play pronunciation');

    setStatus({
      ...status, // 复制现有状态
      isPlaying: !status.isPlaying,
    });
  }

};
