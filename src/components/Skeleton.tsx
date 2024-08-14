// src/components/Skeleton.tsx
import React from 'react';
import { ImageIcon } from '@radix-ui/react-icons';

const Skeleton: React.FC = () => (
  <div className="relative w-full h-72 bg-gray-700 rounded animate-pulse flex items-center justify-center">
    <ImageIcon />
  </div>
);

export default Skeleton;
