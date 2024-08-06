import React from "react";
import { Card, Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const SinglePost = ({ post, onEdit, onDelete }) => {
  return (
    <Card
      className="shadow-lg mb-4"
      bordered={false}
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
      <p className="mt-2 text-gray-600">Deadline: {post.deadline}</p>
    </Card>
  );
};

export default SinglePost;
