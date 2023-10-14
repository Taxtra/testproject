import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
} from '@nextui-org/react';

import { toast } from 'sonner';

export default function App(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState(props.userGroup.id);
  const [selectedRights, setSelectedRights] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();

  const [username, setUsername] = useState(props.name);

  const handleChange = event => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setCurrentGroup(props.userGroup);
  }, []);

  useEffect(() => {
    setCurrentGroup(props.groups.find(group => group.id === selectedGroup));
  }, [selectedGroup]);

  const editUser = async () => {
    await fetch(`/api/editUser`, {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
        username: username,
        groupId: selectedGroup,
        rights: selectedRights,
      }),
    }).then(function (response) {
      if (response.ok) {
        toast.success('User erfolgreich überarbeitet');
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  const deleteUser = async () => {
    await fetch(`/api/deleteUser`, {
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
        toast.success('User erfolgreich gelöscht!');
      } else {
        toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut');
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen} variant="light">
        {'Verwalten'}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-bold">{props.name}`s Rechte</h1>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Username"
                  defaultValue={props.name}
                  onChange={handleChange}
                />
                <RadioGroup
                  label="Gruppe auswählen"
                  onValueChange={setSelectedGroup}
                  defaultValue={props.userGroup?.id}
                >
                  {props.groups.map(group => (
                    <Radio value={group.id} key={group.id}>
                      {group.name}
                    </Radio>
                  ))}
                </RadioGroup>
                <CheckboxGroup
                  label="Gruppenberechtigungen"
                  value={currentGroup.rights.map(right => right.id)}
                  isDisabled
                >
                  {currentGroup.rights.map(right => (
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
                <Button
                  color="warning"
                  variant="light"
                  onPress={onClose}
                  onClick={deleteUser}
                >
                  User löschen
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
                  onClick={editUser}
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
