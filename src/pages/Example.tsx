import {
    Button,
    Center,
    FormControl,
    Input,
    Modal,
    useColorModeValue,
} from 'native-base';
import React, {useState} from 'react';

export default function Example() {
    const [showModal, setShowModal] = useState(false);
    const bg = useColorModeValue('warmGray.50', 'coolGray.800');

    return (
        <Center flex={1}>
            <Button onPress={() => setShowModal(true)}>Button</Button>
            <Modal
                bg={bg}
                isOpen={showModal}
                onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Contact Us</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input />
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Email</FormControl.Label>
                            <Input />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false);
                                }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
}
