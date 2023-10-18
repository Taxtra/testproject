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
import { useGlobalContext } from '../Context/data';
import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedRights, setSelectedRights] = useState([]);

  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidGroup, setIsInvalidGroup] = useState(false);

  const [currentGroup, setCurrentGroup] = useState();

  const [username, setUsername] = useState('');

  const { rights, groups, refetch } = useGlobalContext();

  const handleChange = event => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setCurrentGroup(groups.find(group => group.id === selectedGroup));
  }, [selectedGroup, groups]);

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
        refetch();
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  const handleSubmit = () => {
    if (!username) {
      return setIsInvalidUsername(true);
    }
    if (!currentGroup) {
      return setIsInvalidGroup(true);
    }
    setIsInvalidUsername(false);
    setIsInvalidGroup(false);
    saveUser();
    onClose();
    setUsername('');
    setSelectedGroup([]);
    setSelectedRights([]);
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
                <Input
                  type="text"
                  label="Username"
                  isInvalid={isInvalidUsername}
                  errorMessage={
                    isInvalidUsername && 'Bitte gebe einen Username ein'
                  }
                  onChange={handleChange}
                />
                <RadioGroup
                  label="Gruppe auswählen"
                  isInvalid={isInvalidGroup}
                  errorMessage={isInvalidGroup && 'Bitte wähle eine Gruppe aus'}
                  onValueChange={setSelectedGroup}
                >
                  {groups.map(group => (
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
                  {rights.map(right => (
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
                <Button color="primary" variant="light" onClick={handleSubmit}>
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
