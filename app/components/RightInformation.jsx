import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteRight = async () => {
    await fetch(`/api/deleteRight`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('Recht erfolgreich gelöscht');
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen} variant="light">
        {'Mehr Information'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-bold">{props.name}</h1>
              </ModalHeader>
              <ModalBody>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  onClick={deleteRight}
                >
                  Recht löschen
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
