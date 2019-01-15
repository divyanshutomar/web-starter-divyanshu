export const getFeaturedText = (references) => {
  let featuredText = 'Currently not featured';
  if (references.length) {
    const othersLength = references.length - 1;
    featuredText = `Featured in ${references[0].site_name}${othersLength > 0 ? `... +${othersLength}` : ''}`;
  }
  return featuredText;
};

export const getRestaurantImage = (images) => {
  let image = '';
  if (images && images.length) {
    image = images[0];
  }
  return image;
};

export const minsAwayFromDistance = (distance) => {
  const distanceInMeters = distance * 1609.34; // m
  const avgWalkingSpeed = 1.4; // m/s
  return Math.round((distanceInMeters / avgWalkingSpeed) / 60); // in minutes
};
