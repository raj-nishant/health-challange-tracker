import React from "react";
import { Card, Button, Badge, Radio } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

interface SinglePostProps {
  post: any;
  onEdit: (post: any) => void;
  onDelete: (post: any) => void;
  onProgressUpdate: (progress: number) => void;
}

const SinglePost: React.FC<SinglePostProps> = ({
  post,
  onEdit,
  onDelete,
  onProgressUpdate,
}) => {
  const statusColor =
    post.status === "DONE"
      ? "green"
      : post.status === "IN PROGRESS"
      ? "yellow"
      : "red";

  const totalProgress =
    post.frequency === "daily"
      ? parseInt(post.duration) * 7
      : parseInt(post.duration);

  const handleProgressClick = () => {
    const newProgress = post.progress + 1;
    if (newProgress >= totalProgress) {
      onProgressUpdate(post.id, newProgress, "DONE");
    } else {
      onProgressUpdate(post.id, newProgress, post.status);
    }
  };

  return (
    <Card
      className="shadow-lg border mb-4"
      bordered={false}
      title={
        <div className="flex justify-between items-center">
          <span>{post.title}</span>
          <Badge color={statusColor} text={post.status} />
        </div>
      }
      extra={
        <div className="flex space-x-2">
          <Button type="text" icon={<EditOutlined />} onClick={onEdit} />
          <Button type="text" icon={<DeleteOutlined />} onClick={onDelete} />
        </div>
      }
    >
      <h4 className="font-semibold text-xl">{post.title}</h4>
      <p className="text-gray-700 mb-2">{post.description}</p>
      {post.url && (
        <Button
          type="link"
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          icon={<PlayCircleOutlined />}
          className="text-blue-500"
        >
          View Tutorial
        </Button>
      )}
      <Radio.Group className="mt-2">
        <Radio.Button onClick={handleProgressClick}>
          Done {post.progress}/{totalProgress}
        </Radio.Button>
        <Radio.Button
          onClick={() =>
            onProgressUpdate(post.id, post.progress, "IN PROGRESS")
          }
        >
          Missed Task
        </Radio.Button>
        <Radio.Button
          onClick={() => onProgressUpdate(post.id, post.progress, "DONE")}
        >
          Mark as Completed
        </Radio.Button>
      </Radio.Group>
      <div className="mt-2">
        Progress: {((post.progress / totalProgress) * 100).toFixed(2)}%
      </div>
    </Card>
  );
};

export default SinglePost;
