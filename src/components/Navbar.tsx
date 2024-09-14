import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setFilterOption, setSearchQuery } from "../redux/tasksSlice";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { MenuOutlined } from "@ant-design/icons"; // Hamburger icon

const { Option, OptGroup } = Select;

const Navbar: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "duedate" | "priority-asc" | "priority-desc" | undefined
  >(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage menu visibility

  useEffect(() => {
    gsap.fromTo(
      ".navbar-item",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  const taskHandler = () => {
    navigate("/");
    setIsMenuOpen(false); // Close menu after navigation
  };

  const addTaskHandler = () => {
    navigate("/add-task");
    setIsMenuOpen(false); // Close menu after navigation
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(setSearchQuery(value));
  };

  const handleFilterChange = (
    value: "duedate" | "priority-asc" | "priority-desc" | undefined
  ) => {
    setFilter(value);
    dispatch(setFilterOption(value));
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle the menu

  return (
    <motion.div
      className="bg-custom-gradient py-5 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 px-[4%] relative">
        {/* Hamburger icon for mobile */}
        <div className="absolute top-0 left-0 md:hidden flex items-center pl-4 pt-3">
          <MenuOutlined
            className="text-3xl cursor-pointer navbar-item"
            onClick={toggleMenu}
          />
        </div>

        {/* Left side: Tasks and Add Task */}
        <div
          className={`${
            isMenuOpen ? "fixed inset-x-0 top-0 max-h-[10vh] overflow-auto" : ""
          } md:static z-50 flex-col md:flex-row md:space-x-7 space-y-2 md:space-y-0 items-center justify-center md:flex ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <motion.h1
            className={`text-2xl font-semibold cursor-pointer navbar-item ${
              isActive("/") ? "underline" : ""
            } text-black`} // Ensure visibility on mobile
            onClick={taskHandler}
            whileHover={{ scale: 1.1 }}
          >
            Tasks
          </motion.h1>
          <motion.h1
            className={`text-2xl font-semibold cursor-pointer navbar-item ${
              isActive("/add-task") ? "underline" : ""
            } text-white md:text-black`} // Ensure visibility on mobile
            onClick={addTaskHandler}
            whileHover={{ scale: 1.1 }}
          >
            Add Task
          </motion.h1>
        </div>

        {/* Right side: Search Bar and Filter */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          {/* Search Bar */}
          <motion.div
            className="w-[300px] navbar-item"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Input
              placeholder="Search tasks..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full"
            />
          </motion.div>

          {/* Filter Dropdown */}
          <motion.div
            className="w-[200px] navbar-item"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Select
              placeholder="Sort By"
              value={filter}
              onChange={handleFilterChange}
              className="w-full"
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
          className="fixed inset-0 boxsi bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
