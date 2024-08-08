import React, { useEffect, useState } from "react";
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
  startDate: string;
  duration: string;
  frequency: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [toDoPosts, setToDoPosts] = useState<Post[]>([]);
  const [inProgressPosts, setInProgressPosts] = useState<Post[]>([]);
  const [donePosts, setDonePosts] = useState<Post[]>([]);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showUpdatePostModal, setShowUpdatePostModal] =
    useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

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
        startDate: post.startDate || post.deadline,
        duration: post.duration,
        frequency: post.frequency,
        progress: post.progress || 0,
      }));
      setPosts(transformedPosts);
    }
  }, [showAddPostModal]);

  // Filter posts by status
  useEffect(() => {
    setToDoPosts(posts.filter((post) => post.status === "TO DO"));
    setInProgressPosts(posts.filter((post) => post.status === "IN PROGRESS"));
    setDonePosts(posts.filter((post) => post.status === "DONE"));
  }, [posts]);

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

  // Handle progress update
  const handleProgressUpdate = (
    postId: string,
    newProgress: number,
    newStatus: string
  ) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, progress: newProgress, status: newStatus }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="p-4 text-[#5a5a5a] bg-[#ffeade] min-h-screen pt-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-center text-xl font-bold mb-4">Active</h3>
          <div className="space-y-4">
            {toDoPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
                onProgressUpdate={handleProgressUpdate}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">Missed</h3>
          <div className="space-y-4">
            {inProgressPosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
                onProgressUpdate={handleProgressUpdate}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-center text-xl font-bold mb-4">Completed</h3>
          <div className="space-y-4">
            {donePosts.map((post) => (
              <SinglePost
                key={post.id}
                post={post}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDeletePost(post.id)}
                onProgressUpdate={handleProgressUpdate}
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
        Add Challenge
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
