import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";
import saveIcon from "../../assets/save.jpg";
import { LOCAL_STORAGE_POST_NAME } from "../../contexts/constants";

const NavbarMenu = () => {
  const user = localStorage.getItem("username");

  const {
    postState: { posts },
    sortPostsByTitle,
    sortPostsByDeadline,
    setShowToast,
  } = useContext(PostContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const save = () => {
    const postJsonString = JSON.stringify(posts);
    localStorage.setItem(LOCAL_STORAGE_POST_NAME, postJsonString);
    setShowToast({
      show: true,
      message: "The posts have successfully saved!",
      type: "success",
    });
  };

  const sort = (option) => {
    if (option === "title") {
      sortPostsByTitle();
    } else if (option === "deadline") {
      sortPostsByDeadline();
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-white font-semibold text-xl">
              Dashboard
            </Link>
            <span className="ml-6 text-white font-semibold">
              Welcome {user}
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sort By
              </button>
              {isDropdownOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        sort("title");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Title
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      onClick={() => {
                        sort("deadline");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Deadline
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={save}
            >
              <img src={saveIcon} alt="Save Icon" className="w-6 h-6 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;
