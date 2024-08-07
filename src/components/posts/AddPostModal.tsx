import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment, { Moment } from "moment";

interface AddPostModalProps {
  visible: boolean;
  onClose: () => void;
  onAddPost: (post: NewPost) => void;
}

interface NewPost {
  id: string;
  title: string;
  description: string;
  duration: string;
  startDate: string;
  frequency: string;
  url: string;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  visible,
  onClose,
  onAddPost,
}) => {
  const [newPost, setNewPost] = useState<NewPost>({
    id: uuidv4(),
    title: "",
    description: "",
    duration: "",
    startDate: "",
    frequency: "daily",
    url: "", // Added URL field
  });

  const { title, description, startDate, duration, frequency, url } = newPost;

  const onChangeNewPostForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onChangeStartDate = (date: Moment | null, dateString: string) => {
    setNewPost({ ...newPost, startDate: dateString });
  };

  const onChangeDuration = (value: string) => {
    setNewPost({ ...newPost, duration: value });
  };

  const onChangeFrequency = (value: string) => {
    setNewPost({ ...newPost, frequency: value });
  };

  const onSubmit = () => {
    onAddPost(newPost);
    resetAddPostData();
  };

  const resetAddPostData = () => {
    setNewPost({
      id: uuidv4(),
      title: "",
      description: "",
      duration: "",
      startDate: "",
      frequency: "daily",
      url: "", // Reset URL field
    });
    onClose();
  };

  return (
    <Modal
      title="Create new challenge"
      visible={visible}
      onCancel={resetAddPostData}
      footer={[
        <Button key="cancel" onClick={resetAddPostData}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Title" required>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChangeNewPostForm}
            required
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            rows={3}
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChangeNewPostForm}
          />
        </Form.Item>
        <Form.Item label="Start Date">
          <DatePicker
            format="YYYY-MM-DD"
            value={startDate ? moment(startDate, "YYYY-MM-DD") : null}
            onChange={onChangeStartDate}
          />
        </Form.Item>
        <Form.Item label="Duration">
          <Select value={duration} onChange={onChangeDuration}>
            <Select.Option value="1">1 week</Select.Option>
            <Select.Option value="2">2 weeks</Select.Option>
            <Select.Option value="3">3 weeks</Select.Option>
            <Select.Option value="4">4 weeks</Select.Option>
            <Select.Option value="5">5 weeks</Select.Option>
            <Select.Option value="6">6 weeks</Select.Option>
            <Select.Option value="7">7 weeks</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Frequency">
          <Select value={frequency} onChange={onChangeFrequency}>
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="weekly">Weekly</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tutorial URL">
          <Input
            type="text"
            placeholder="Tutorial URL"
            name="url"
            value={url}
            onChange={onChangeNewPostForm}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
