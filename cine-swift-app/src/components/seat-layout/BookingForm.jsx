export const BookingForm = ({
  groupSize,
  setGroupSize,
  ageRestriction,
  setAgeRestriction,
  seniorFlexible,
  setSeniorFlexible,
  isVip,
  setVip,
  setShowBookingModal,
}) => {
  const isProceedEnabled = isVip || groupSize > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Book Seats</h2>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isVip}
            onChange={() => setVip(!isVip)}
            className="mr-2"
          />
          VIP Option
        </label>
      </div>

      {!isVip && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Group Size:</label>
            <select
              className="w-full p-2 border rounded"
              value={groupSize === 0 ? "" : groupSize}
              onChange={(e) => setGroupSize(Number.parseInt(e.target.value))}
            >
              <option value="" disabled>
                Select group size
              </option>
              {[1, 2, 3, 4, 5, 6, 7].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? "person" : "people"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={ageRestriction}
                onChange={() => setAgeRestriction(!ageRestriction)}
                className="mr-2"
              />
              Children in the group?
            </label>
          </div>

          {groupSize === 1 && (
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={seniorFlexible}
                  onChange={() => setSeniorFlexible(!seniorFlexible)}
                  className="mr-2"
                />
                Senior flexible seating
              </label>
            </div>
          )}
        </div>
      )}

      {/* Proceed Button */}
      <button
        className={`w-full py-2 rounded mt-4 font-semibold ${
          isProceedEnabled
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => setShowBookingModal(false)}
        disabled={!isProceedEnabled}
      >
        Proceed to Seat Selection
      </button>
    </div>
  );
};
