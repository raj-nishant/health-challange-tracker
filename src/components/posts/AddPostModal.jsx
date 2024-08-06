import React, { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import moment from 'moment';

const AddPostModal = () => {
  const {
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    setShowToast
  } = useContext(PostContext);

  const [newPost, setNewPost] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    url: '',
    status: 'TO DO',
    deadline: '',
  });

  const { title, description, url, deadline } = newPost;

  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onChangeDate = (date, dateString) => {
    setNewPost({ ...newPost, deadline: dateString });
  };

  const closeDialog = () => {
    resetAddPostData();
  };

  const onSubmit = () => {
    addPost(newPost);
    resetAddPostData();
    setShowToast({ show: true, message: 'Create new post successfully!', type: 'success' });
    message.success('Create new post successfully!');
  };

  const resetAddPostData = () => {
    setNewPost({ id: uuidv4(), title: '', description: '', url: '', status: 'TO DO', deadline: '' });
    setShowAddPostModal(false);
  };

  return (
    <Modal
      title="Create new task!"
      visible={showAddPostModal}
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
      <Form layout="vertical" onSubmit={onSubmit}>
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
        <Form.Item label="Material URL">
          <Input
            type="text"
            placeholder="Material URL"
            name="url"
            value={url}
            onChange={onChangeNewPostForm}
          />
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

export default AddPostModal;
