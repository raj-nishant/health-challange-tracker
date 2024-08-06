import React from "react";
import { Card, Badge, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Post {
  id: string;
  status: string;
  title: string;
  description: string;
  url: string;
  deadline: string;
}

interface SinglePostProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const SinglePost: React.FC<SinglePostProps> = ({ post, onEdit, onDelete }) => {
  const statusColor =
    post.status === "DONE"
      ? "green"
      : post.status === "IN PROGRESS"
      ? "yellow"
      : "red";

  return (
    <Card
      className="mb-4 shadow-md"
      title={
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{post.title}</span>
          <Badge color={statusColor} text={post.status} />
        </div>
      }
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" icon={<EditOutlined />} onClick={onEdit} />
          <Button type="default" icon={<DeleteOutlined />} onClick={onDelete} />
        </div>
      }
    >
      <p className="mb-2">{post.description}</p>
      {post.url && (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Tutorial
        </a>
      )}
      <p className="mt-2 text-gray-600">Deadline: {post.deadline}</p>
    </Card>
  );
};

export default SinglePost;
