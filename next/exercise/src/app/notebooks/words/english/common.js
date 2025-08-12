import {useCallback} from 'react';
import {toast} from "react-toastify";
import {useStatus} from '@/app/lib/atoms';

export const useWordOperations = () => {
  const [status, setStatus] = useStatus();

  const handlePriority = useCallback(async (priority) => {
    setStatus(prev => ({...prev, isProcessing: true}));

    try {
      const response = await fetch("/api/notebooks/words/update-priority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update_priority",
          word: status.words[status.currentWordIndex],
          value: priority,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error("Failed to set word priority.");
      }

      toast.success("Successfully set word priority.");

      setStatus(prev => ({
        ...prev,
        isProcessing: false,
        words: prev.words.map((word, index) =>
          index === prev.currentWordIndex
            ? {...word, priority}
            : word
        )
      }));

    }
    catch (err) {
      console.error("Failed to set word priority.");
      toast.error("Failed to set word priority.");
      setStatus(prev => ({...prev, isProcessing: false}));
    }
  }, [status.words, status.currentWordIndex, setStatus]);

  return {
    handlePriority,
    // 可以添加其他操作
  };
};