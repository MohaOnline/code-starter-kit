'use client';

import TailwindPlayground from './TailwindPlayground';

export default function FlexPlaygroundPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Tailwind Flex Playground</h1>
      <TailwindPlayground />
    </div>
  );
}
