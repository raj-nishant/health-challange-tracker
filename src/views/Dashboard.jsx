import { PostContext } from "../contexts/PostContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
  // Contexts
  // const {
  //   authState: {
  //     user: { username },
  //   },
  // } = useContext(AuthContext);

  const user = localStorage.getItem("username");

  const {
    postState: { post, posts, sortBy },
    loadPost,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Classify posts based on their completion status
  const [toDoPosts, setToDoPosts] = useState([]);
  const [inProgressPosts, setInProgressPosts] = useState([]);
  const [donePosts, setDonePosts] = useState([]);
  const [deadlineNotiOpen, setDeadlineNotiOpen] = useState(true);
  const [earliestDeadline, setEarliestDeadline] = useState({
    title: "",
    deadline: "",
  });

  useEffect(() => {
    setToDoPosts([]);
    setInProgressPosts([]);
    setDonePosts([]);
    posts.forEach((post) => {
      if (post.status === "TO DO") {
        setToDoPosts((prev) => [...prev, post]);
      } else if (post.status === "IN PROGRESS") {
        setInProgressPosts((prev) => [...prev, post]);
      } else if (post.status === "DONE") {
        setDonePosts((prev) => [...prev, post]);
      }
    });
  }, [posts, sortBy]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const closeDeadlineNotify = () => {
    setDeadlineNotiOpen(false);
  };

  const getEarliestDeadline = useCallback(() => {
    if (posts.length === 0) {
      return;
    }
    let earliestDeadlineTask = posts[0];
    let earliestDeadline = new Date(posts[0].deadline);
    for (let i = 1; i < posts.length; i++) {
      const deadline = new Date(posts[i].deadline);
      if (deadline < earliestDeadline) {
        earliestDeadline = deadline;
        earliestDeadlineTask = posts[i];
      }
    }
    setEarliestDeadline(earliestDeadlineTask);
  }, [posts]);

  useEffect(() => {
    getEarliestDeadline();
  }, [getEarliestDeadline]);

  return (
    <div className="p-4">
      {posts.length > 0 && (
        <div
          className={`max-w-xl mx-auto mb-4 p-6 bg-white shadow-md rounded ${
            deadlineNotiOpen ? "" : "hidden"
          }`}
        >
          <h1 className="text-2xl font-bold mb-2">Hi {user}</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Deadline Notification</h2>
            <p className="text-gray-700">
              The deadline for task{" "}
              <span className="font-bold">{earliestDeadline.title}</span> is{" "}
              <span className="font-bold">{earliestDeadline.deadline}</span>,
              which is the earliest deadline.
            </p>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={closeDeadlineNotify}
          >
            Close
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-center text-xl font-bold mb-4">TO DO</h3>
          <div className="space-y-4">
            {toDoPosts.map((post) => (
              <SinglePost key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">IN PROGRESS</h3>
          <div className="space-y-4">
            {inProgressPosts.map((post) => (
              <SinglePost key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">DONE</h3>
          <div className="space-y-4">
            {donePosts.map((post) => (
              <SinglePost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full  hover:bg-green-600"
        onClick={() => setShowAddPostModal(true)}
      >
        <img src={addIcon} alt="Add Post" className="w-8 h-8" />
      </button>
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <div
        className={`fixed top-20 right-10 p-4 bg-${
          type === "success" ? "green" : "red"
        }-500 text-white rounded shadow-md ${show ? "" : "hidden"}`}
        onClose={() =>
          setShowToast({
            show: false,
            message: "",
            type: null,
          })
        }
      >
        <strong>{message}</strong>
      </div>
    </div>
  );
};

export default Dashboard;
