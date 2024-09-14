// TaskForm.tsx
import React, { useState } from 'react';
import { DatePicker, Dropdown, Menu, Button as AntButton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Button from './UI/Button';
import InputBox from './UI/InputBox';
import { useAppDispatch } from '../redux/store';
import { addTask } from '../redux/tasksSlice';
import { Task } from '../types/Task';
import { useNavigate } from 'react-router-dom';

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'High',
    status: 'In Progress',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    if (Array.isArray(dateString)) {
      dateString = dateString.join(', ');
    }
    setTask({ ...task, dueDate: dateString });
  };

  const handleMenuClick = (type: string, value: string) => {
    setTask({ ...task, [type]: value });
  };

  const priorityMenu = (
    <Menu
      onClick={({ key }) => handleMenuClick('priority', key)}
      className="font-elevon" // Apply custom font here
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
      className="font-elevon" // Apply custom font here
      items={[
        { key: 'In Progress', label: 'In Progress' },
        { key: 'Completed', label: 'Completed' },
      ]}
    />
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({ title: '', description: '', dueDate: '', priority: 'Medium', status: 'In Progress' });
    navigate('/');
  };

  return (
    <div className="w-full boxsi max-w-[1000px] p-8 sm:p-8 text-white font-inherit flex flex-col gap-5 box-border mx-auto fade-in-left">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-black font-semibold text-xs md:text-xl mb-1">
            Task Title
          </label>
          <InputBox
            placeholder="Task Title"
            name="title"
            value={task.title}
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
            value={task.description}
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
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-black font-semibold text-xs md:text-xl mb-1">
            Priority
          </label>
          <Dropdown overlay={priorityMenu} trigger={['click']} className="font-elevon">
            <AntButton
              className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10"
            >
              {task.priority} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-black font-semibold text-xs md:text-xl mb-1">
            Status
          </label>
          <Dropdown overlay={statusMenu} trigger={['click']} className="font-elevon">
            <AntButton
              className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10"
            >
              {task.status} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <Button />
      </form>
    </div>
  );
};

export default TaskForm;
