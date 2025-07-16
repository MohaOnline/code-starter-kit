'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NavTopProps {
  title?: string;
  backUrl?: string;
  className?: string;
}

export function NavTop({ 
  title = '英语单词学习', 
  backUrl = '/notebooks/words', 
  className = '' 
}: NavTopProps) {
  return (
    <nav className={`flex items-center justify-between p-4 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex items-center space-x-3">
        <Link 
          href={backUrl}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* 可以在这里添加其他导航元素 */}
      </div>
    </nav>
  );
}