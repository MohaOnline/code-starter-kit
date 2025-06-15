import { useAtom } from 'jotai';
import { useStatus } from '@/app/lib/atoms';

import './ProcessingMask.css';



export function ProcessingMask() {
  const [status] = useStatus();
  return (
    <>
    {/* 全屏遮罩 */ }
    {
      status.isProcessing && (
        <div className={'processing overlay'}>
          <div className={'processing loader'}>Processing...</div>
        </div>
      )
    }
    </>
  );
}