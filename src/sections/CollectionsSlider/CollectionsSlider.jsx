
import { useState, useRef, useCallback } from 'react';
import { ArrowRight, MoveHorizontal } from 'lucide-react';
import './CollectionsSlider.css';
import { collectionsData as defaultCollectionsData } from '../../data/landingData';

/**
 * CollectionsSlider - Full-Screen Zoomed Split-Screen Slit Slider
 *
 * Requirements:
 * - Real curtain split sliding (as originally designed)
 * - Full-screen zoomed images (object-fit: cover), not contained/letterboxed
 * - Men on the LEFT, Women & Kids on the RIGHT
 * - Zero blur on corners, edges, or buttons; 100% crisp photos
 * - Clean minimal title: "Explore Categories"
 * - Corner buttons only:
 *   - "EXPLORE MEN COLLECTION" at bottom-left corner
 *   - "EXPLORE WOMEN & KIDS COLLECTION" at bottom-right corner
 */
const CollectionsSlider = ({
  data = defaultCollectionsData,
  sliderPosition: externalSliderPosition,
  onSliderChange,
  onExploreMen,
  onExploreWomen,
  sectionRef,
}) => {
  const [uncontrolledPos, setUncontrolledPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const arenaRef = useRef(null);

  // Controlled vs uncontrolled state pattern
  const isControlled = externalSliderPosition !== undefined;
  const activePosition = isControlled ? externalSliderPosition : uncontrolledPos;

  const setPosition = useCallback((newVal) => {
    const clamped = Math.max(0, Math.min(100, newVal));
    if (!isControlled) {
      setUncontrolledPos(clamped);
    }
    if (onSliderChange) {
      onSliderChange(clamped);
    }
  }, [isControlled, onSliderChange]);

  // Pointer interactions with PointerCapture for smooth, fluid dragging
  const handlePointerDown = (e) => {
    if (!arenaRef.current) return;
    setIsDragging(true);
    arenaRef.current.setPointerCapture(e.pointerId);
    updateFromPointer(e);
  };

  const updateFromPointer = (e) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const clientX = e.clientX;
    const relativeX = clientX - rect.left;
    const percentage = (relativeX / rect.width) * 100;
    setPosition(percentage);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateFromPointer(e);
  };

  const handlePointerUp = (e) => {
    if (isDragging && arenaRef.current) {
      try {
        arenaRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture was already released
      }
      setIsDragging(false);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(activePosition - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(activePosition + 5);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  // Fade out buttons gracefully when the slit moves directly into their corner
  const menBtnOpacity = activePosition < 18 ? Math.max(0, activePosition / 18) : 1;
  const womenBtnOpacity = activePosition > 82 ? Math.max(0, (100 - activePosition) / 18) : 1;

  return (
    <section
      className="maaya-categories-section"
      id="collections-section"
      ref={sectionRef}
      aria-label="Explore Categories"
    >
      {/* Title only: Explore Categories */}
      <div className="categories-header">
        <h2 className="categories-title">{data.title || "Explore Categories"}</h2>
      </div>

      {/* Full-Screen Zoomed Arena: Crisp, Unblurred, High-Impact Streetwear Split */}
      <div
        ref={arenaRef}
        className={`categories-arena ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* ==============================================================
            BASE LAYER (RIGHT): WOMEN & KIDS COLLECTION
            Full screen zoomed image, unveiled on the right
            ============================================================== */}
        <div className="category-layer layer-women" aria-hidden={activePosition > 96}>
          <img
            src={data.women.image}
            alt={data.women.imageAlt}
            className="category-photo photo-women"
            draggable="false"
          />

          {/* Women Button in bottom-right corner */}
          <div
            className="corner-btn-anchor corner-bottom-right"
            style={{
              opacity: womenBtnOpacity,
              pointerEvents: activePosition > 82 ? 'none' : 'auto',
            }}
          >
            <a
              href={data.women.action.href}
              className="corner-category-btn btn-women-corner"
              onClick={(e) => {
                if (onExploreWomen) {
                  e.preventDefault();
                  onExploreWomen();
                }
              }}
            >
              <span className="btn-text">{data.women.action.label}</span>
              <ArrowRight size={14} className="btn-icon" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* ==============================================================
            OVERLAY LAYER (LEFT): MEN'S COLLECTION
            Full screen zoomed image, clipped from 0% to activePosition%
            Unveiled on the left
            ============================================================== */}
        <div
          className="category-layer layer-men"
          style={{
            clipPath: `polygon(0 0, ${activePosition}% 0, ${activePosition}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${activePosition}% 0, ${activePosition}% 100%, 0 100%)`,
            transition: isDragging ? 'none' : 'clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-hidden={activePosition < 4}
        >
          <img
            src={data.men.image}
            alt={data.men.imageAlt}
            className="category-photo photo-men"
            draggable="false"
          />

          {/* Men Button in bottom-left corner */}
          <div
            className="corner-btn-anchor corner-bottom-left"
            style={{
              opacity: menBtnOpacity,
              pointerEvents: activePosition < 18 ? 'none' : 'auto',
            }}
          >
            <a
              href={data.men.action.href}
              className="corner-category-btn btn-men-corner"
              onClick={(e) => {
                if (onExploreMen) {
                  e.preventDefault();
                  onExploreMen();
                }
              }}
            >
              <span className="btn-text">{data.men.action.label}</span>
              <ArrowRight size={14} className="btn-icon" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* ==============================================================
            CENTRAL SLIT DIVIDER & DRAGGABLE HANDLE
            Positioned at activePosition%
            ============================================================== */}
        <div
          className="slit-divider"
          style={{
            left: `${activePosition}%`,
            transition: isDragging ? 'none' : 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="slit-vertical-line" />
          <div
            className={`slit-handle ${isDragging ? 'is-active' : ''}`}
            tabIndex={0}
            role="slider"
            aria-label="Split slider between Men on left and Women on right"
            aria-valuenow={Math.round(activePosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
          >
            <div className="handle-core">
              <span className="arrow-left">&#9668;</span>
              <MoveHorizontal size={14} className="arrow-icon" strokeWidth={2.5} />
              <span className="arrow-right">&#9658;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSlider;
