const DetailsImage = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100">
      <img
        src={`/images/${image}`}
        alt="image1"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default DetailsImage;
