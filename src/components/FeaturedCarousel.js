import React, { useEffect, useState } from 'react';

const featuredImages = [
  { src: '/images/lavender.jpeg', alt: 'Lavender Bliss' },
  { src: '/images/vanilla.jpeg', alt: 'Vanilla Dreams' },
  { src: '/images/citrius.jpeg', alt: 'Citrus Sunset' }
];

export default function FeaturedCarousel() {
  const [shuffled, setShuffled] = useState(featuredImages);

  useEffect(() => {
    const interval = setInterval(() => {
      const newShuffle = [...featuredImages].sort(() => 0.5 - Math.random());
      setShuffled(newShuffle);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
      {/* Left: Large image */}
      <div
        style={{
          flex: 2,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <img
          src={shuffled[0].src}
          alt={shuffled[0].alt}
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
        <h4 style={{ textAlign: 'center', marginTop: '6px', color: '#c97e93' }}>{shuffled[0].alt}</h4>
      </div>

      {/* Right: 2 stacked smaller images */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <img
              src={shuffled[i].src}
              alt={shuffled[i].alt}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '190px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
            <h5 style={{ textAlign: 'center', marginTop: '6px', color: '#c97e93' }}>{shuffled[i].alt}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
