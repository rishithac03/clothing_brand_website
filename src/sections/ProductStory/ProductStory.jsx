import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './ProductStory.css';
import { productStoryData as defaultProductStoryData } from '../../data/landingData';

const ProductStory = ({ data = defaultProductStoryData, sectionRef: externalSectionRef, productRef }) => {
  const localSectionRef = useRef(null);
  const sectionRef = externalSectionRef || localSectionRef;
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const frontOpacity = useTransform(scrollYProgress, [0, 0.16, 0.27, 0.52, 0.68], [0, 0, 1, 1, 0]);
  const backOpacity = useTransform(scrollYProgress, [0, 0.16, 0.27, 0.52, 0.68], [0, 0, 0, 1, 1]);
  const frontScale = useTransform(scrollYProgress, [0.16, 0.3], [0.96, 1]);
  const backScale = useTransform(scrollYProgress, [0.5, 0.68], [0.96, 1]);

  return (
    <section
      className="product-story-section"
      id="product-details"
      ref={sectionRef}
      aria-labelledby="product-story-title"
    >
      <div className="product-story-stage">
        <header className="product-story-heading">
          <span className="product-story-eyebrow">{data.eyebrow}</span>
          <h2 id="product-story-title">{data.title}</h2>
          <p>{data.description}</p>
        </header>

        <div
          className="product-story-product"
          ref={productRef}
          aria-label="Front and back views of the MAAYA T-shirt"
        >
          <motion.img
            className="product-story-image product-story-image-front"
            src={data.frontImage}
            alt="Front of the red MAAYA T-shirt with Telugu artwork"
            style={{
              opacity: prefersReducedMotion ? 1 : frontOpacity,
              scale: prefersReducedMotion ? 1 : frontScale,
            }}
            draggable="false"
          />
          <motion.img
            className="product-story-image product-story-image-back"
            src={data.backImage}
            alt="Back of the red MAAYA T-shirt with black and white brushstroke artwork"
            style={{
              opacity: prefersReducedMotion ? 0 : backOpacity,
              scale: prefersReducedMotion ? 1 : backScale,
            }}
            draggable="false"
          />
        </div>

        <div className="product-story-features">
          {data.features.map((feature) => (
            <motion.article
              className={`product-story-feature product-story-feature-${feature.side}`}
              key={feature.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: feature.side === 'left' ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="product-story-feature-label">{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductStory;
