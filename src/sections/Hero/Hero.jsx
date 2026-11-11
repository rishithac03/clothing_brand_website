import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';
import TShirt3D from '../../components/TShirt3D/TShirt3D';
import { data as defaultHeroData } from '../../data/landingData';

const Hero = ({
  data = defaultHeroData,
  onPrimaryAction,
  sectionRef,
  visualRef,
  productOpacity,
  onModelBounds,
}) => {
  const caption = data?.caption;
  const actions = data?.actions;
  const productPreview = data?.productPreview;

  return (
    <section className="maaya-hero-section" id="hero" ref={sectionRef}>
      <div className="hero-layout-grid">
        {/* Left Column: Streetwear Caption & Single Minimal Action */}
        <div className="hero-content-col">
          {/* Caption Typography: Driven directly from landingData */}
          {caption && (
            <div className="hero-caption-group">
              <h1 className="hero-caption-title">
                <span className="hero-caption-line">{caption.line1}</span>
                <span className="hero-caption-line">{caption.line2}</span>
                <span className="hero-caption-line hero-caption-brand-line">
                  <span>{caption.prefix}</span>
                  <span className="hero-caption-brand">{caption.brand}</span>
                </span>
              </h1>
            </div>
          )}

          {/* Single Minimal Primary Action: Driven directly from landingData */}
          {actions?.primary && (
            <div className="hero-actions-group">
              <a
                href={actions.primary.href || "#collection"}
                className="hero-primary-btn"
                onClick={(e) => {
                  if (onPrimaryAction) {
                    e.preventDefault();
                    onPrimaryAction();
                  }
                }}
              >
                <span className="btn-label">{actions.primary.label}</span>
                <ArrowRight size={14} className="btn-arrow" strokeWidth={2.2} />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: 3D Animated T-Shirt with 360° Drag & Rotation */}
        <div className="hero-visual-col" ref={visualRef}>
          <motion.div className="hero-visual-scroll" style={{ opacity: productOpacity }}>
            <TShirt3D
              modelPath={productPreview?.modelPath || '/models/maaya_red_tshirt_front_back.glb'}
              autoRotateSpeed={1.4}
              onModelBounds={onModelBounds}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
