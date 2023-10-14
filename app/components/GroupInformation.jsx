import { useState } from 'react';
import React from 'react';
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

  const [groupName, setGroupName] = useState(props.name);

  const handleChange = event => {
    setGroupName(event.target.value);
  };

  const editGroup = async () => {
    await fetch(`/api/editGroup`, {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
        name: groupName,
        rights: selected,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('Gruppe erfolgreich gespeichert!');
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  const deleteGroup = async () => {
    await fetch(`/api/deleteGroup`, {
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
        toast.success('Gruppe erfolgreich gelöscht!');
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
                <h1 className="font-bold">
                  {props.name + ' Gruppe bearbeiten'}
                </h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Gruppen Name"
                  onChange={handleChange}
                  defaultValue={props.name}
                />
                <CheckboxGroup
                  label="Brechtigungen auswählen"
                  onValueChange={setSelected}
                  defaultValue={props.groupRights.map(right => right.id)}
                >
                  {props.rights.map(right => (
                    <Checkbox value={right.id} key={right.id}>
                      {right.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
                <Button
                  color="warning"
                  variant="light"
                  onPress={onClose}
                  onClick={deleteGroup}
                >
                  Gruppe löschen
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  onClick={editGroup}
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
