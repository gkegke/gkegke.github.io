import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({ title, description, name, type }) {
  const siteTitle = 'gkegke';
  const metaTitle = title ? `${siteTitle} | ${title}` : siteTitle;
  const metaDescription = description || "Personal blog and project portfolio of gkegke.";

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      
      {/* Twitter */}
      <meta name="twitter:creator" content={name || 'gkegke'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};