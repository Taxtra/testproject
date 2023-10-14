'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from '@nextui-org/react';
import RightInformation from './RightInformation';

export default function App(props) {
  return (
    <Card className="max-w-[340px] min-w-[340px] bg-gray-800">
      <CardHeader className="flex justify-center">
        <h1 className="font-semibold text-center">{props.name}</h1>
      </CardHeader>
      <CardFooter className="gap-3 flex justify-between">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Rechte</p>
        </div>
        <RightInformation name={props.name} id={props.id} />
      </CardFooter>
    </Card>
  );
}
