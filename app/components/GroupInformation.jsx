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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selected, setSelected] = useState([]);

  const [groupName, setGroupName] = useState(props.name);

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidRights, setIsInvalidRights] = useState(false);

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

  const handleSubmit = () => {
    if (!groupName) {
      return setIsInvalidName(true);
    }
    if (selected.length === 0) {
      return setIsInvalidRights(true);
    }
    setIsInvalidName(false);
    setIsInvalidRights(false);
    editGroup();
    onClose();
    setGroupName('');
    setSelected([]);
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
                  isInvalid={isInvalidName}
                  errorMessage={isInvalidName && 'Bitte gebe einen Namen ein'}
                  onChange={handleChange}
                  defaultValue={props.name}
                />
                <CheckboxGroup
                  label="Brechtigungen auswählen"
                  isInvalid={isInvalidRights}
                  errorMessage={
                    isInvalidRights && 'Bitte wähle mindestens ein Recht aus'
                  }
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
