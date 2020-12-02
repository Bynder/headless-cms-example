const HeroImage = ({ url }) => (
  <div
    style={{ backgroundImage: `url(${url})` }}
    className="bg-cover bg-center h-60"
  />
);

export default HeroImage;
