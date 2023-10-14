'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { Divider } from '@nextui-org/react';

const Sidebar = () => {
  const redirect = link => {
    location.href = `/${link}`;
  };

  return (
    <div className="bg-gray-800 w-64 h-screen p-3 fixed">
      <div className="flex items-center h-32">
        <img src="/logo.png" alt="logo" className="h-16 rounded max-w-[5rem]" />
        <h1 className=" text-xl font-semibold pl-2">Test Aufgabe</h1>
      </div>
      <Divider className="relative bottom-4 bg-gray-500" />
      <ul>
        <li>
          <Button
            className="bg-gradient-to-r from-sky-950 to-sky-800 w-full"
            onClick={() => {
              redirect('');
            }}
          >
            Team
          </Button>
        </li>
        <li>
          <Button
            className="bg-gradient-to-r from-sky-950 to-sky-800 w-full mt-4"
            onClick={() => {
              redirect('rights');
            }}
          >
            Rechte
          </Button>
        </li>
        <li>
          <Button
            className="bg-gradient-to-r from-sky-950 to-sky-800 w-full mt-4"
            onClick={() => {
              redirect('groups');
            }}
          >
            Gruppen
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
