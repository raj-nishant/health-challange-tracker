import React, { useContext } from "react";
import { Button, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <div className="flex space-x-2">
      <Tooltip title="View">
        <Button href={url} target="_blank" icon={<PlayCircleOutlined />} />
      </Tooltip>
      <Tooltip title="Edit">
        <Button onClick={() => choosePost(id)} icon={<EditOutlined />} />
      </Tooltip>
      <Tooltip title="Delete">
        <Button onClick={() => deletePost(id)} icon={<DeleteOutlined />} />
      </Tooltip>
    </div>
  );
};

export default ActionButtons;
