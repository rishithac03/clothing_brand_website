import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './LandingPage.css';
import Navbar from '../../sections/Navbar/Navbar';
import Hero from '../../sections/Hero/Hero';
import ProductStory from '../../sections/ProductStory/ProductStory';
import { brandConfig, navbarData, data, productStoryData } from '../../data/landingData';

/**
 * Main Landing Page Component
 * Serves as the master orchestrator calling individual, modular section components.
 */
const LandingPage = () => {
  const heroRef = useRef(null);
  const heroVisualRef = useRef(null);
  const storyRef = useRef(null);
  const storyProductRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [heroModelBounds, setHeroModelBounds] = useState(null);
  const [transferPath, setTransferPath] = useState({
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    startWidth: null,
    startHeight: null,
    endWidth: null,
    endHeight: null,
  });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start 76px', 'end 76px'],
  });
  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });
  const transferLeft = useTransform(
    scrollYProgress,
    [0, 1],
    [transferPath.startX ?? 0, transferPath.endX ?? 0]
  );
  const transferTop = useTransform(
    scrollYProgress,
    [0, 1],
    [transferPath.startY ?? 0, transferPath.endY ?? 0]
  );
  const transferWidth = useTransform(
    storyScrollProgress,
    [0, 0.16],
    [transferPath.startWidth ?? 0, transferPath.endWidth ?? 0]
  );
  const transferHeight = useTransform(
    storyScrollProgress,
    [0, 0.16],
    [transferPath.startHeight ?? 0, transferPath.endHeight ?? 0]
  );
  const transferHeroOpacity = useTransform(scrollYProgress, [0.01, 0.06], [0, 1]);
  const transferStoryOpacity = useTransform(
    storyScrollProgress,
    [0.12, 0.2],
    [1, 0]
  );
  const transferOpacity = useTransform(
    [transferHeroOpacity, transferStoryOpacity],
    ([heroOpacity, storyOpacity]) => heroOpacity * storyOpacity
  );
  const heroProductOpacity = useTransform(scrollYProgress, [0.01, 0.06], [1, 0]);

  useLayoutEffect(() => {
    const updateTransferPath = () => {
      const heroCanvas = heroVisualRef.current?.querySelector('.tshirt-canvas-container');
      const heroBounds = heroCanvas?.getBoundingClientRect();
      const storyBounds = storyRef.current?.getBoundingClientRect();
      const productBounds = storyProductRef.current?.getBoundingClientRect();
      const stickyOffset = window.matchMedia('(max-width: 640px)').matches ? 0 : 76;

      if (
        !heroBounds ||
        !storyBounds ||
        !productBounds ||
        !heroModelBounds ||
        heroBounds.width === 0 ||
        heroBounds.height === 0 ||
        productBounds.width === 0 ||
        productBounds.height === 0
      ) {
        return;
      }

      setTransferPath({
        startX: heroBounds.left + heroModelBounds.left + heroModelBounds.width / 2,
        startY: heroBounds.top + heroModelBounds.top + heroModelBounds.height / 2,
        endX: productBounds.left + productBounds.width / 2,
        endY: stickyOffset + productBounds.top - storyBounds.top + productBounds.height / 2,
        startWidth: heroModelBounds.width,
        startHeight: heroModelBounds.height,
        endWidth: productBounds.width,
        endHeight: productBounds.height,
      });
    };

    updateTransferPath();
    window.addEventListener('resize', updateTransferPath);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updateTransferPath);
    [heroVisualRef.current, storyRef.current, storyProductRef.current]
      .filter(Boolean)
      .forEach((element) => resizeObserver?.observe(element));

    return () => {
      window.removeEventListener('resize', updateTransferPath);
      resizeObserver?.disconnect();
    };
  }, [heroModelBounds]);

  return (
    <div className="landing-page">
      {/* 1. Header & Navigation Bar */}
      <Navbar
        brand={brandConfig}
        data={navbarData}
        onNavClick={(link) => console.log('Navigated to:', link)}
        onSearch={(query) => console.log('Search query:', query)}
      />

      {/* 2. Hero Section with 3D Animated T-Shirt */}
      <Hero
        data={data}
        onPrimaryAction={() => console.log('Primary CTA clicked')}
        sectionRef={heroRef}
        visualRef={heroVisualRef}
        productOpacity={prefersReducedMotion ? 1 : heroProductOpacity}
        onModelBounds={setHeroModelBounds}
      />

      {/* 3. Scroll-driven product details and artwork */}
      <ProductStory
        data={productStoryData}
        sectionRef={storyRef}
        productRef={storyProductRef}
      />

      {!prefersReducedMotion && (
        <motion.div
          className="product-journey-transfer"
          style={{
            left: transferLeft,
            top: transferTop,
            width: transferWidth,
            height: transferHeight,
            opacity: prefersReducedMotion ? 0 : transferOpacity,
          }}
          aria-hidden="true"
        >
          <img src={productStoryData.frontImage} alt="" draggable="false" />
        </motion.div>
      )}
    </div>
  );
};

export default LandingPage;
