import React, { useState, useEffect } from 'react';
import { DatePicker, Dropdown, Menu, Button as AntButton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Button from './UI/Button';
import InputBox from './UI/InputBox';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateTask } from '../redux/tasksSlice';
import { Task } from '../types/Task';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import dayjs from 'dayjs';

const EditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get task ID from URL parameters
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the task from the Redux store based on the task ID
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

  // If task is null, you can handle it by showing a loading state or an error
  const [editableTask, setEditableTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'In Progress',
  });

  useEffect(() => {
    if (task) {
      setEditableTask(task);
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditableTask({ ...editableTask, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      dateString = dateString.join(', ');
    }
    setEditableTask({ ...editableTask, dueDate: dateString });
  };

  const handleMenuClick = (type: string, value: string) => {
    setEditableTask({ ...editableTask, [type]: value });
  };

  const priorityMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick('priority', key)}
      items={[
        { key: 'Low', label: 'Low' },
        { key: 'Medium', label: 'Medium' },
        { key: 'High', label: 'High' },
      ]}
    />
  );

  const statusMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick('status', key)}
      items={[
        { key: 'In Progress', label: 'In Progress' },
        { key: 'Completed', label: 'Completed' },
      ]}
    />
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Ensure task is defined before dispatching the update
    if (task) {
      dispatch(updateTask({
        ...editableTask,
        id: task.id, // Safely access task.id
      }));
      navigate('/');
    } else {
      console.error("Task is undefined");
      // Handle this case appropriately, e.g., show an error message
    }
  };
  

  if (!task) {
    return <div>Loading or Task not found...</div>;  // Handle loading or missing task case
  }

  return (
    <div className="w-full max-w-[1000px] p-8 mx-auto boxsi">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-black font-semibold text-xs md:text-xl mb-1">
            Task Title
          </label>
          <InputBox
            placeholder="Task Title"
            name="title"
            value={editableTask.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-black font-semibold text-xs md:text-xl mb-1">
            Task Description
          </label>
          <InputBox
            placeholder="Task Description"
            name="description"
            value={editableTask.description}
            onChange={handleChange}
            isTextarea
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate" className="text-black font-semibold text-xs md:text-xl mb-1">
            Due Date
          </label>
          <DatePicker
            placeholder="Due Date"
            className="w-full py-3 px-4 rounded-lg text-white bg-transparent border border-[#414141] placeholder-opacity-50 focus:outline-none focus:border-[#e81cff] font-elevon"
            onChange={handleDateChange}
            value={editableTask.dueDate ? moment(editableTask.dueDate) : null}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-black font-semibold text-xs md:text-xl mb-1">
            Priority
          </label>
          <Dropdown overlay={priorityMenu} trigger={['click']}>
            <AntButton className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10">
              {editableTask.priority} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-black font-semibold text-xs md:text-xl mb-1">
            Status
          </label>
          <Dropdown overlay={statusMenu} trigger={['click']}>
            <AntButton className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10">
              {editableTask.status} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <Button />
      </form>
    </div>
  );
};

export default EditForm;
    