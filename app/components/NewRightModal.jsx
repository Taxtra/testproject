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

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newRight, setNewRight] = useState('');

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
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
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
                <Input type="text" label="Recht Name" onChange={handleChange} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  onClick={saveRight}
                >
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
