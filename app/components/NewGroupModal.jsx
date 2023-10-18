'use client';

import React from 'react';
import { useState } from 'react';
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
} from '@nextui-org/react';
import { useGlobalContext } from '../Context/data';

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selected, setSelected] = useState([]);

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidRights, setIsInvalidRights] = useState(false);

  const [groupName, setGroupName] = useState('');

  const { rights, refetch } = useGlobalContext();

  const handleChange = event => {
    setGroupName(event.target.value);
  };

  const saveGroup = async () => {
    const groupRights = [];

    selected.forEach(right => {
      groupRights.push({ id: right });
    });

    await fetch('/api/newGroup', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: groupName,
        groupRights: groupRights,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('Gruppe erfolgreich erstellt!');
        refetch();
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  const handleSubmit = () => {
    if (!groupName) {
      return setIsInvalidName(true);
    }
    if (selected.length === 0) {
      return setIsInvalidRights(true);
    }
    setIsInvalidName(false);
    setIsInvalidRights(false);
    saveGroup();
    onClose();
    setGroupName('');
    setSelected([]);
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-sky-950">
        {'Neue Gruppe erstellen --->'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-bold">Neue Gruppe erstellen</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Gruppen Name"
                  isInvalid={isInvalidName}
                  errorMessage={isInvalidName && 'Bitte gebe einen Namen ein'}
                  onChange={handleChange}
                />
                <CheckboxGroup
                  label="Brechtigungen auswählen"
                  isInvalid={isInvalidRights}
                  errorMessage={
                    isInvalidRights && 'Bitte wähle mindestens ein Recht aus'
                  }
                  onValueChange={setSelected}
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
                  Gruppe speichern
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
