'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react';
import GroupInformation from './GroupInformation';

export default function App(props) {
  return (
    <Card className="max-w-[340px] min-w-[340px] bg-gray-800">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            radius="full"
            size="lg"
            src={`https://api.dicebear.com/7.x/icons/svg?seed=${props.name}`}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h1 className="font-semibold">{props.name}</h1>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-red-600 ml-10">
        <ul>
          {props.groupRights.map(right => (
            <li key={right.id}>{right.name}</li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="gap-3 flex justify-between">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {props.groupRights.length}
          </p>
          <p className=" text-default-400 text-small">Rechte</p>
        </div>
        <GroupInformation
          name={props.name}
          id={props.id}
          rights={props.rights}
          groupRights={props.groupRights}
        />
      </CardFooter>
    </Card>
  );
}
