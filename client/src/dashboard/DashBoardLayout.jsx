import React, { useState } from 'react';
import { BiHomeAlt, BiSelectMultiple, BiLogInCircle } from 'react-icons/bi';
import { SiGoogleclassroom, SiInstructure } from 'react-icons/si';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { MdPayments } from 'react-icons/md';
import Scroll from '../hooks/useScroll';
import { HashLoader } from 'react-spinners';
import { TbTableShortcut } from "react-icons/tb"

// Пример данных для меню студентов
const students = [
  { to: '/debtors', icon: <TbTableShortcut  className="text-2xl" />, label: 'Tables' },
  { to: '/myEnroll', icon: <SiGoogleclassroom className="text-2xl" />, label: 'My enroll' },
  { to: '/mySelected', icon: <BiSelectMultiple className="text-2xl" />, label: 'My selected' },
  { to: '/paymentHistory', icon: <MdPayments className="text-2xl" />, label: 'Payment History' },
  { to: '/applyForInst', icon: <SiInstructure className="text-2xl" />, label: 'Apply for Instructor' },
];

// Пример данных для последних пунктов меню
const lastMenuItems = [
  { to: '/setting', icon: <BiHomeAlt className="text-2xl" />, label: 'Settings' },
  { to: '/help', icon: <BiHomeAlt className="text-2xl" />, label: 'Help' },
];

const DashBoardLayout = () => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки
  const [role, setRole] = useState('user'); // Пример роли пользователя
  const navigate = useNavigate();

  // Функция для выхода из системы
  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout me!',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true); // Начинаем загрузку
        // Симуляция выхода из системы
        setTimeout(() => {
          setIsLoading(false); // Завершаем загрузку
          Swal.fire({
            title: 'Logged out!',
            text: 'You have been logged out successfully.',
            icon: 'success',
          }).then(() => {
            navigate('/'); // Перенаправляем на главную страницу
          });
        }, 2000); // Имитация задержки
      }
    });
  };

  // Если идет загрузка, показываем спиннер
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#f40dcf" />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Боковая панель */}
      <div
        className={`${open ? 'w-72 overflow-y-auto' : 'w-[90px] overflow-auto'} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          
          <Link to="/">
            <h1
              className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && 'scale-0'}`}
            >
              
            </h1>
          </Link>
        </div>

        {/* Меню для студентов */}
        {role === 'user' && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-400 ${!open && 'hidden'}`}>
              <small>Menu</small>
            </p>
            {students.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex flex-row items-center ${isActive ? 'bg-red-500 text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{menuItem.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Последние пункты меню */}
        <ul className="pt-6">
          <p className={`ml-3 text-gray-400 uppercase ${!open && 'hidden'}`}>
            <small>Useful Links</small>
          </p>
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex flex-row items-center ${isActive ? 'bg-red-500 text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap`
                }
              >
                {menuItem.icon}
                <span className={`${!open && 'hidden'} origin-left duration-200`}>{menuItem.label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogOut}
              className="flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm gap-x-4 whitespace-nowrap"
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Основной контент */}
      <div className="h-screen overflow-y-auto px-8 flex-1">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;