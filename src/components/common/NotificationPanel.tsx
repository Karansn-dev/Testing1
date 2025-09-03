import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  hasUnread?: boolean;
}

export const NotificationPanel: React.FC<Props> = ({ open, onClose, hasUnread }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }} className="fixed right-0 top-0 h-full w-full sm:w-[380px] z-50 bg-surface/95 backdrop-blur-xl border-l border-white/10">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-text-primary">
                <Bell className="w-5 h-5 text-text-primary" />
                <span className="font-semibold">Notifications</span>
                {hasUnread && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-danger" />}
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded" aria-label="Close notifications">
                <X className="w-5 h-5 text-secondary" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-surface border border-white/10 rounded p-4">
                <div className="flex items-start gap-3">
                  <Bell className="w-4 h-4 text-danger mt-1" />
                  <div>
                    <p className="text-text-primary font-medium">Crisis Hotline: 1800-599-0019</p>
                    <p className="text-secondary text-sm mt-1">If you are having thoughts of self-harm or suicide, please reach out immediately.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};


