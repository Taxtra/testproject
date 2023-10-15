'use client';

import React, { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Divider,
} from '@nextui-org/react';
import UserInformation from './UserInformation';

export default function App(props) {
  return (
    <Card className="max-w-[340px] min-w-[340px] bg-gray-800">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            radius="full"
            size="lg"
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${props.name}`}
            className="min-w-[50px]"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="font-semibold">{props.name}</h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-slate-500 ">
        <h1 className="text-zinc-500 text-center">
          Gruppe: {props.group?.name || 'KEINE GRUPPE'}
        </h1>
        <Divider className=" bg-gray-500" />
        <ul className="text-zinc-400">
          {props.group?.rights.map(right => (
            <li key={right.id}>{right.name}</li>
          ))}
        </ul>
        <Divider className=" bg-gray-700" />

        <ul>
          {props.userRights?.map(right => (
            <li key={right.id}>{right.name}</li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="gap-3 flex justify-between">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {(props.group?.rights.length || 0) + (props.userRights.length || 0)}
          </p>
          <p className=" text-default-400 text-small">Rechte</p>
        </div>
        <UserInformation
          name={props.name}
          groups={props.groups}
          rights={props.rights}
          userGroup={props.group}
          id={props.id}
        />
      </CardFooter>
    </Card>
  );
}
