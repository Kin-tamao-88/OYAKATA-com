import { useEffect, useRef } from "react";
import type { Photo } from "./companyDetails";

type Props = {
  photo: Photo;
  label: string;
  onClose: () => void;
};

/** 画像の拡大表示。PCは画面に収め、SPは文字が読める大きさで横スクロールする。 */
export default function ImageLightbox({ photo, label, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${label}の拡大表示`}
      className="fixed inset-0 z-[100] bg-[#111]/95 flex flex-col"
    >
      <div className="flex items-center justify-between gap-4 px-4 lg:px-8 h-[56px] lg:h-[64px] shrink-0">
        <p className="text-white font-bold text-[14px] lg:text-[16px] truncate">{label}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="拡大表示を閉じる"
          className="flex items-center gap-2 h-10 px-3 text-white font-bold text-[14px] border border-white/40 hover:bg-white/10"
        >
          閉じる
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <line x1="4" y1="4" x2="18" y2="18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="18" y1="4" x2="4" y2="18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-auto" onClick={onClose}>
        <div className="min-h-full min-w-full w-max flex items-center justify-center p-3 lg:p-6">
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            onClick={(e) => e.stopPropagation()}
            className="block max-w-none w-[900px] h-auto lg:w-auto lg:max-w-[min(1536px,calc(100vw-48px))] lg:max-h-[calc(100vh-130px)]"
          />
        </div>
      </div>
    </div>
  );
}
