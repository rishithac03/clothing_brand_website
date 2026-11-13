import { useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import './ProductRailGallery.css';
import { productRailData as defaultRailData } from '../../data/landingData';

const garmentViews = {
  oversized: {
    front: '/images/off_white_front.png',
    side: '/images/off_white_side.png',
  },
  sweatshirts: {
    front: '/images/Red_front.png',
    side: '/images/Red_side.png',
  },
  sleeveless: {
    front: '/images/black_front.png',
    side: '/images/black_side.png',
  },
};

const ProductRailGallery = ({ data = defaultRailData }) => {
  const categories = data.categories || [];
  const products = categories
    .map((category) => data.products?.[category.id]?.[0])
    .filter(Boolean);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || null);
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const selectedCategory = selectedProduct?.category || 'oversized';
  const selectedCategoryData = categories.find((category) => category.id === selectedCategory);
  const selectedViews = selectedProduct
    ? garmentViews[selectedCategory] || garmentViews.oversized
    : null;

  return (
    <section
      className="product-rail-section"
      id={data.id || 'product-rail-section'}
      aria-label="T-shirt category product rail"
    >
      <div className="rail-ambient-glow" aria-hidden="true" />
      <div className="rail-content">
        <header className="rail-header">
          <span className="rail-eyebrow">
            <span className="rail-eyebrow-dot" />
            {data.eyebrow}
          </span>
          <h2 className="rail-title">{data.title}</h2>
          <p className="rail-subtitle">
            {data.subtitle ||
              'Browse the rail. Hover for a front view, then select a piece to see every detail.'}
          </p>
        </header>

        <div className={`rail-display ${selectedProduct ? 'has-selection' : ''}`}>
          {selectedProduct && selectedViews && (
            <aside
              className="rail-product-details"
              aria-label={`${selectedCategoryData?.title || selectedProduct.name} collection`}
            >
              <div className={`rail-detail-image category-${selectedCategory}`}>
                <img
                  src={selectedViews.front}
                  alt={`${selectedCategoryData?.title || selectedProduct.name}, front view`}
                />
              </div>

              <div className="rail-detail-copy">
                <h3 className="rail-detail-title">
                  {selectedCategoryData?.title || selectedCategoryData?.label || selectedProduct.name}
                </h3>
                <p className="rail-detail-description">
                  {selectedCategoryData?.description || selectedProduct.description}
                </p>
                <a
                  className="rail-explore-category-button"
                  href={selectedCategoryData?.href || '#collections-section'}
                >
                  <span>EXPLORE CATEGORY</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </aside>
          )}

          <div
            className="rail-stage"
          >
            <div className="rail-rod" aria-hidden="true">
              <span className="rail-rod-highlight" />
              <span className="rail-rod-cap rail-rod-cap-left" />
              <span className="rail-rod-cap rail-rod-cap-right" />
            </div>

            {products.length ? (
              <div className="rail-items">
                {products.map((product, index) => {
                  const category = product.category || categories[index]?.id || 'oversized';
                  const categoryLabel = categories.find((item) => item.id === category)?.label;
                  const categoryViews = garmentViews[category] || garmentViews.oversized;
                  const views = categoryViews;
                  const isSelected = selectedProductId === product.id;

                  return (
                    <button
                      key={product.id}
                      className={`rail-hanger-card category-${category} ${
                        isSelected ? 'is-selected' : ''
                      }`}
                      type="button"
                      onClick={() => setSelectedProductId(product.id)}
                      aria-label={`View details for ${product.name}`}
                      aria-pressed={isSelected}
                    >
                      <span className="rail-garment-frame" aria-hidden="true">
                        <span className="rail-garment-swing">
                          <img
                            className="rail-garment-side"
                            src={views.side}
                            alt=""
                            draggable="false"
                          />
                          <img
                            className="rail-garment-front"
                            src={views.front}
                            alt=""
                            draggable="false"
                          />
                        </span>
                      </span>
                      <span className="rail-card-meta">
                        <span className="rail-card-index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="rail-card-copy">
                          <span className="rail-card-category">{categoryLabel}</span>
                          <span className="rail-card-name">{product.name}</span>
                        </span>
                      </span>
                      <span className="rail-hover-cue">
                        <Eye size={14} /> VIEW PIECE
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="rail-empty-state">No pieces are available in this category yet.</p>
            )}

            <div className="rail-stage-caption">
              <span>SELECT A PIECE TO DISCOVER</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProductRailGallery;
