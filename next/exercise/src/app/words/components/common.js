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
  status.onWheel = false;

  // 对话框开启的处理
  if (status.isDialogOpen) {

    if (event.key === 'Escape' && document.activeElement.tagName === 'INPUT' &&
        document.activeElement instanceof HTMLInputElement &&
        document.activeElement.type === 'text' && !!status.isComposing) {
      event.preventDefault(); // 阻止 ESC 键的默认行为
    } else if (event.key === 'Tab') {
      console.debug('Tab Down');
      status.isTabPressed = true;
      setStatus({
        ...status, // 复制现有状态
      });
    }
    return;
  }
  // 对话框未开启的处理
  else {
    if (document.activeElement.tagName === 'INPUT' &&
        document.activeElement instanceof HTMLInputElement &&
        document.activeElement.type === 'text') {
      return;
      
    } else {
      event.preventDefault?.();
    }
  }

  console.log(event.key);
  if (event.key === 'F5') {
    console.log('F5 被阻止');
  }

  if (event.key === 'ArrowRight') {
    console.debug('next word');

    let next = status.currentWordIndex + 1;
    // if (status.words !== undefined) {
    //   next = Math.min(status.words.length - 1, next);
    // }
    if (next > status.words.length - 1) {
      next = 0;
    }

    setStatus({
      ...status, // 复制现有状态
      currentWordIndex: next, // 更新 currentWord
    });
  } else if (event.key === 'ArrowLeft') {
    console.debug('previous word');

    let nextIndex = status.currentWordIndex - 1;
    if (nextIndex < 0) {
      nextIndex = status.words.length - 1;
    }

    setStatus({
      ...status, // 复制现有状态
      isPlaying: false,
      // currentWordIndex: Math.max(0, status.currentWordIndex - 1),
      currentWordIndex: nextIndex,
    });
  } else if (event.key === 'v') {
    console.debug('play current pronunciation');
    status.playCurrent();

  } else if (event.key === ' ') {
    console.debug('play pronunciation');

    setStatus({
      ...status, // 复制现有状态
      isPlaying: !status.isPlaying,
    });
  }

  localStorage.setItem('wordStatus', status.currentWordIndex);
};
