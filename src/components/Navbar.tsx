import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setFilterOption, setSearchQuery } from "../redux/tasksSlice";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const { Option, OptGroup } = Select;

const Navbar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"duedate" | "priority-asc" | "priority-desc" | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".navbar-item",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  const taskHandler = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const addTaskHandler = () => {
    navigate("/add-task");
    setIsMenuOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  const handleFilterChange = (value: "duedate" | "priority-asc" | "priority-desc" | undefined) => {
    setFilter(value);
    dispatch(setFilterOption(value));
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-5 relative shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 px-[4%] relative">
        {/* Hamburger icon for mobile */}
        <div className="absolute top-0 left-0 md:hidden flex items-center pl-4 pt-3 z-50">
          <MenuOutlined
            className="text-3xl cursor-pointer navbar-item text-white"
            onClick={toggleMenu}
          />
        </div>

        {/* Left side: Tasks and Add Task */}
        <div
          className={`${
            isMenuOpen ? "fixed inset-x-0 top-0 max-h-[10vh] overflow-auto bg-white shadow-lg rounded-lg" : ""
          } md:static z-50 flex-col md:flex-row md:space-x-7 space-y-2 md:space-y-0 items-center justify-center md:flex ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <motion.h1
            className={`text-2xl font-semibold cursor-pointer navbar-item ${
              isActive("/") ? "underline text-white" : "text-white"
            }`}
            onClick={taskHandler}
            whileHover={{ scale: 1.1, rotateY: 15, perspective: 500 }}
            whileTap={{ scale: 0.9 }}
          >
            Tasks
          </motion.h1>
          <motion.h1
            className={`text-2xl font-semibold cursor-pointer navbar-item ${
              isActive("/add-task") ? "underline text-white" : "text-white"
            }`}
            onClick={addTaskHandler}
            whileHover={{ scale: 1.1, rotateY: 15, perspective: 500 }}
            whileTap={{ scale: 0.9 }}
          >
            Add Task
          </motion.h1>
        </div>

        {/* Right side: Search Bar and Filter */}
        <div
          className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 ${
            isMenuOpen ? "mt-16" : "" // Margin-top for mobile view when menu is open
          }`}
        >
          {/* Search Bar */}
          <motion.div
            className={`md:w-[300px] w-[250px] ${isMenuOpen ? "mt-4" : "md:ml-[10%]"}`}  // Adjust margin-top when menu is open, margin-left for desktop view
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border-none shadow-md focus:outline-none"
              style={{ backgroundColor: "#ffffff" }}
            />
          </motion.div>

          {/* Filter Dropdown */}
          <motion.div
            className="flex items-center space-x-2 w-[200px]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white md:hidden">Sort By</span>  {/* Label visible only on mobile */}
            <Select
              placeholder=""
              value={filter}
              onChange={handleFilterChange}
              className="w-full rounded-lg border-none shadow-md"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Option value="duedate">Due Date</Option>
              <OptGroup label="Priority">
                <Option value="priority-desc">High to Low</Option>
                <Option value="priority-asc">Low to High</Option>
              </OptGroup>
            </Select>
          </motion.div>
        </div>
      </div>

      {/* Children container */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>

      {/* Overlay to close the menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
