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

const EditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id)
  );

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
      className='font-elevon'
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
      className="font-elevon"
      items={[
        { key: 'In Progress', label: 'In Progress' },
        { key: 'Completed', label: 'Completed' },
      ]}
    />
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (task) {
      dispatch(updateTask({
        ...editableTask,
        id: task.id, 
      }));
      navigate('/');
    } else {
      console.error("Task is undefined");
    }
  };
  

  if (!task) {
    return <div className="font-elevon">Loading or Task not found...</div>;  // Handle loading or missing task case
  }

  return (
    <div className="w-full max-w-[1000px] p-8 mx-auto boxsi font-elevon">
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-black font-semibold text-xs md:text-xl mb-1 font-elevon">
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
          <label htmlFor="description" className="text-black font-semibold text-xs md:text-xl mb-1 font-elevon">
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
          <label htmlFor="dueDate" className="text-black font-semibold text-xs md:text-xl mb-1 font-elevon">
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
          <label htmlFor="priority" className="text-black font-semibold text-xs md:text-xl mb-1 font-elevon">
            Priority
          </label>
          <Dropdown overlay={priorityMenu} trigger={['click']}>
            <AntButton className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10 font-elevon">
              {editableTask.priority} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-black font-semibold text-xs md:text-xl mb-1 font-elevon">
            Status
          </label>
          <Dropdown overlay={statusMenu} trigger={['click']}>
            <AntButton className="w-[20%] rounded-lg bg-transparent border border-[#414141] text-white focus:outline-none focus:border-[#e81cff] flex justify-between items-center h-10 font-elevon">
              {editableTask.status} <DownOutlined />
            </AntButton>
          </Dropdown>
        </div>
        <Button  />
      </form>
    </div>
  );
};

export default EditForm;
