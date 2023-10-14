'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from '@nextui-org/react';

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedRights, setSelectedRights] = useState([]);

  const [currentGroup, setCurrentGroup] = useState();

  const [username, setUsername] = useState('');

  const handleChange = event => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setCurrentGroup(props.groups.find(group => group.id === selectedGroup));
  }, [selectedGroup, props.group]);

  const saveUser = async () => {
    await fetch('/api/newUser', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        groupId: selectedGroup,
        rights: selectedRights,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('User erfolgreich erstellt!');
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-sky-950">
        {'Neuen User erstellen --->'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-bold">Neuen User erstellen</h1>
              </ModalHeader>
              <ModalBody>
                <Input type="text" label="Username" onChange={handleChange} />
                <RadioGroup
                  label="Gruppe auswählen"
                  onValueChange={setSelectedGroup}
                >
                  {props.groups.map(group => (
                    <Radio value={group.id} key={group.id}>
                      {group.name}
                    </Radio>
                  ))}
                </RadioGroup>
                <CheckboxGroup
                  label="Gruppenberechtigungen"
                  value={currentGroup?.rights.map(right => right.id)}
                  isDisabled
                >
                  {currentGroup?.rights.map(right => (
                    <Checkbox value={right.id} key={right.id}>
                      {right.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <CheckboxGroup
                  label="Weitere Brechtigungen auswählen"
                  onValueChange={setSelectedRights}
                >
                  {props.rights.map(right => (
                    <Checkbox value={right.id} key={right.id}>
                      {right.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  onClick={saveUser}
                >
                  User speichern
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
