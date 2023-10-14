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

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState([]);

  const [groupName, setGroupName] = useState('');

  const handleChange = event => {
    setGroupName(event.target.value);
    console.log(selected);
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
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
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
                  onChange={handleChange}
                />
                <CheckboxGroup
                  label="Brechtigungen auswählen"
                  onValueChange={setSelected}
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
                  onClick={saveGroup}
                >
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
