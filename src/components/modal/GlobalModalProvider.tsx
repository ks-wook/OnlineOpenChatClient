'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import GlobalModal from './GlobalModal';

type ModalState = {
  isOpen: boolean;
  title?: string;
  content?: ReactNode;
};

type ModalContextType = {
  openModal: (options: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function GlobalModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
  });

  const openModal = ({ title, content }: Omit<ModalState, 'isOpen'>) => {
    setModal({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModal = () => {
    setModal({ isOpen: false });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <GlobalModal {...modal} onClose={closeModal} />
    </ModalContext.Provider>
  );
}

export function useGlobalModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useGlobalModal must be used within GlobalModalProvider');
  }
  return ctx;
}
