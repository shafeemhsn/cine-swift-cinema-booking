export const SeatLegend = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-purple-500 rounded mr-2"></div>
          <span>VIP</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
          <span>Accessible</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-yellow-500 rounded mr-2"></div>
          <span>No Children</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-500 rounded mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </>
  );
};
