import React from "react";
import { FaTimes } from "react-icons/fa";

const categories = [
  "Web Development",
  "AI & ML",
  "AI Tools",
  "Data Analytics",
  "Data Science",
  "Cyber Security",
  "Mobile Development",
  "UI UX Design",
];

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const CourseFilters = ({
  selectedCategories,
  setSelectedCategories,
  selectedLevels,
  setSelectedLevels,
  mobileFilter,
  setMobileFilter,
}) => {

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (c) => c !== category
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };

  const handleLevelChange = (level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(
        selectedLevels.filter(
          (l) => l !== level
        )
      );
    } else {
      setSelectedLevels([
        ...selectedLevels,
        level,
      ]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  return (
    <>
      {/* DESKTOP FILTERS */}

      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200">

        {/* HEADER */}

        <div className="p-5 border-b flex justify-between items-center">

          <h2 className="text-xl font-bold">
            Filters
          </h2>

          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear
          </button>

        </div>

        {/* CATEGORY */}

        <div className="p-5 border-b">

          <h3 className="font-semibold mb-4">
            CATEGORY
          </h3>

          <div className="space-y-3">

            {categories.map((category) => (

              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer"
              >

                <input
                  type="checkbox"
                  checked={selectedCategories.includes(
                    category
                  )}
                  onChange={() =>
                    handleCategoryChange(category)
                  }
                  className="w-4 h-4"
                />

                <span className="text-sm">
                  {category}
                </span>

              </label>

            ))}

          </div>

        </div>

        {/* LEVEL */}

        <div className="p-5">

          <h3 className="font-semibold mb-4">
            COURSE LEVEL
          </h3>

          <div className="space-y-3">

            {levels.map((level) => (

              <label
                key={level}
                className="flex items-center gap-3 cursor-pointer"
              >

                <input
                  type="checkbox"
                  checked={selectedLevels.includes(
                    level
                  )}
                  onChange={() =>
                    handleLevelChange(level)
                  }
                  className="w-4 h-4"
                />

                <span className="text-sm">
                  {level}
                </span>

              </label>

            ))}

          </div>

        </div>

      </div>

      {/* MOBILE DRAWER */}

      {mobileFilter && (

        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setMobileFilter(false)
            }
          />

          {/* Drawer */}

          <div className="absolute left-0 top-0 w-80 max-w-[85%] h-full bg-white overflow-y-auto shadow-xl">

            {/* Header */}

            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">

              <h2 className="text-xl font-bold">
                Filters
              </h2>

              <button
                onClick={() =>
                  setMobileFilter(false)
                }
              >
                <FaTimes size={20} />
              </button>

            </div>

            {/* CATEGORY */}

            <div className="p-5 border-b">

              <h3 className="font-semibold mb-4">
                CATEGORY
              </h3>

              <div className="space-y-3">

                {categories.map((category) => (

                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        category
                      )}
                      onChange={() =>
                        handleCategoryChange(category)
                      }
                    />

                    {category}

                  </label>

                ))}

              </div>

            </div>

            {/* LEVEL */}

            <div className="p-5">

              <h3 className="font-semibold mb-4">
                COURSE LEVEL
              </h3>

              <div className="space-y-3">

                {levels.map((level) => (

                  <label
                    key={level}
                    className="flex items-center gap-3 cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(
                        level
                      )}
                      onChange={() =>
                        handleLevelChange(level)
                      }
                    />

                    {level}

                  </label>

                ))}

              </div>

            </div>

            {/* Footer */}

            <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">

              <button
                onClick={clearFilters}
                className="flex-1 border border-gray-300 rounded-lg py-3"
              >
                Clear
              </button>

              <button
                onClick={() =>
                  setMobileFilter(false)
                }
                className="flex-1 bg-black text-white rounded-lg py-3"
              >
                Apply
              </button>

            </div>

          </div>

        </div>

      )}
    </>
  );
};

export default CourseFilters;