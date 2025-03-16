import React from "react";

const images = import.meta.glob("../img/*.webp", { eager: true });

const FeatureItem = ({ icon, title, description }) => {
  const imageSrc = images[`../img/${icon}.webp`]?.default || "";

  return (
    <div className="feature-item">
      <img src={imageSrc} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;