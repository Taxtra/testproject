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
} from '@nextui-org/react';

import { useGlobalContext } from '../Context/data';
import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [newRight, setNewRight] = useState('');

  const [isInvalid, setIsInvalid] = useState(false);

  const { refetch } = useGlobalContext();

  const handleChange = event => {
    setNewRight(event.target.value);
  };

  const saveRight = async () => {
    await fetch('/api/newRight', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newRight,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('Recht erfolgreich erstellt!');
        refetch();
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  const handleSubmit = () => {
    if (!newRight) {
      return setIsInvalid(true);
    }
    setIsInvalid(false);
    saveRight();
    onClose();
    setNewRight('');
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-sky-950">
        {'Neues Recht erstellen --->'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-bold">Neues Recht erstellen</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Recht Name"
                  isInvalid={isInvalid}
                  errorMessage={isInvalid && 'Bitte gebe einen Namen ein'}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button color="primary" variant="light" onClick={handleSubmit}>
                  Recht speichern
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
