import React, { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { Modal, Button, Form, Input, Select, DatePicker, message } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const UpdatePostModal = () => {
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  const { title, description, url, status, deadline } = updatedPost;

  const onChangeUpdatedPostForm = (event) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  };

  const onChangeDate = (date, dateString) => {
    setUpdatedPost({ ...updatedPost, deadline: dateString });
  };

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = () => {
    updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message: 'The post has been successfully updated!', type: 'success' });
    message.success('The post has been successfully updated!');
  };

  return (
    <Modal
      title="Update Task"
      visible={showUpdatePostModal}
      onCancel={closeDialog}
      footer={[
        <Button key="cancel" onClick={closeDialog}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Title" required>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChangeUpdatedPostForm}
            required
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            rows={3}
            placeholder="Description"
            name="description"
            value={description}
            onChange={onChangeUpdatedPostForm}
          />
        </Form.Item>
        <Form.Item label="Tutorial URL">
          <Input
            type="text"
            placeholder="Tutorial URL"
            name="url"
            value={url}
            onChange={onChangeUpdatedPostForm}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Select
            value={status}
            name="status"
            onChange={(value) => setUpdatedPost({ ...updatedPost, status: value })}
          >
            <Option value="TO DO">TO DO</Option>
            <Option value="IN PROGRESS">IN PROGRESS</Option>
            <Option value="DONE">DONE</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Deadline Day">
          <DatePicker
            format="YYYY-MM-DD"
            value={deadline ? moment(deadline) : null}
            onChange={onChangeDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
