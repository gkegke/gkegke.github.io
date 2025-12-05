import React, { useState } from 'react';
import { createPortal } from 'react-dom';
// Using standard FA icons from all-files for tree-shaking
import { FaRobot } from '@react-icons/all-files/fa/FaRobot';
import { m, AnimatePresence } from 'framer-motion';

export default function AskAIWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Input-like Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          hidden sm:flex items-center gap-3
          bg-zinc-900/50 hover:bg-zinc-800/80
          boder border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]
          pl-3 pr-4 py-1.5 rounded-full
          text-sm text-zinc-500 hover:text-zinc-300
          transition-all duration-300
          mr-3
          group
          cursor-text
        "
        aria-label="Ask AI"
      >
        <FaRobot className="text-lg text-zinc-600 group-hover:text-blue-500 transition-colors" />
        <span className="font-light tracking-wide text-xs lg:text-sm">Ask this blog something</span>
      </button>

      {/* Mobile Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          sm:hidden flex items-center justify-center
          w-9 h-9 rounded-full
          bg-zinc-900/50 hover:bg-zinc-800
          border border-white/10
          text-zinc-400 hover:text-blue-500
          transition-all duration-300
          mr-2
        "
        aria-label="Ask AI"
      >
        <FaRobot className="text-lg" />
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              {/* Backdrop */}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Modal Content */}
              <m.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-[#121215] border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRobot className="text-2xl text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Assistant</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Apologies, experimental. I might add this in the future.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors border border-white/5"
                >
                  Close
                </button>
              </m.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}