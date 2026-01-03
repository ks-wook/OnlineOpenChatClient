'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
  title?: string;
  content?: ReactNode;
  onClose: () => void;
};

export default function GlobalModal({
  isOpen,
  title,
  content,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            className="relative w-full max-w-md rounded-lg bg-white shadow-lg"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-6">
              {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
