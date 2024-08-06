import React, { useEffect, useState, useCallback } from "react";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { Button, notification } from "antd";
import addIcon from "../assets/plus-circle-fill.svg";

interface Post {
  id: string;
  status: string;
  title: string;
  description: string;
  url: string;
  deadline: string;
}

const Dashboard: React.FC = () => {
  const user = localStorage.getItem("username") || "User";

  const [posts, setPosts] = useState<Post[]>([]);
  const [toDoPosts, setToDoPosts] = useState<Post[]>([]);
  const [inProgressPosts, setInProgressPosts] = useState<Post[]>([]);
  const [donePosts, setDonePosts] = useState<Post[]>([]);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showUpdatePostModal, setShowUpdatePostModal] =
    useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [deadlineNotiOpen, setDeadlineNotiOpen] = useState<boolean>(true);
  const [earliestDeadline, setEarliestDeadline] = useState<Post | null>(null);

  // Fetch posts from local storage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    if (Array.isArray(savedPosts)) {
      const transformedPosts = savedPosts.map((post) => ({
        id: post.id,
        status: post.status || "TO DO",
        title: post.title,
        description: post.description,
        url: post.url,
        deadline: post.endDate || post.deadline,
      }));
      setPosts(transformedPosts);
    }
  }, []);

  // Filter posts by status
  useEffect(() => {
    if (posts.length > 0) {
      setToDoPosts(posts.filter((post) => post.status === "TO DO"));
      setInProgressPosts(posts.filter((post) => post.status === "IN PROGRESS"));
      setDonePosts(posts.filter((post) => post.status === "DONE"));
    }
  }, [posts]);

  // Calculate the earliest deadline
  const getEarliestDeadline = useCallback(() => {
    if (posts.length === 0) {
      setEarliestDeadline(null);
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

  // Handle adding a new post
  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Created new post successfully!",
    });
  };

  // Handle updating a post
  const handleUpdatePost = (updatedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Updated post successfully!",
    });
  };

  // Handle deleting a post
  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    notification.success({
      message: "Success",
      description: "Deleted post successfully!",
    });
  };

  // Handle editing a post
  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setShowUpdatePostModal(true);
  };

  return (
    <div className="p-4">
      {posts.length > 0 && earliestDeadline && (
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
          <Button type="primary" onClick={() => setDeadlineNotiOpen(false)}>
            Close
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-center text-xl font-bold mb-4">TO DO</h3>
          <div className="space-y-4">
            {toDoPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">IN PROGRESS</h3>
          <div className="space-y-4">
            {inProgressPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">DONE</h3>
          <div className="space-y-4">
            {donePosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        type="primary"
        icon={<img src={addIcon} alt="Add" />}
        className="fixed bottom-4 right-4 rounded-full"
        onClick={() => setShowAddPostModal(true)}
      >
        Add Post
      </Button>
      <AddPostModal
        visible={showAddPostModal}
        onClose={() => setShowAddPostModal(false)}
        onAddPost={handleAddPost}
      />
      {currentPost && (
        <UpdatePostModal
          visible={showUpdatePostModal}
          onClose={() => setShowUpdatePostModal(false)}
          post={currentPost}
          onUpdatePost={handleUpdatePost}
        />
      )}
    </div>
  );
};

export default Dashboard;
