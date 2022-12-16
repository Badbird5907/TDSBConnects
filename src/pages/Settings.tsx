import React, {useEffect} from 'react';
import {Button, Divider, FormControl, Input, Modal, Text, VStack} from "native-base";
import {SafeAreaView, useColorScheme} from "react-native";
import {DARK_BACKGROUND, LIGHT_BACKGROUND, styles} from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({navigation}: any) => {
    // TODO: use less of the stuff below and concatenate the edit buttons into one component with modifiable props
    const colorMode = useColorScheme();
    const bgColor = colorMode === 'dark' ? DARK_BACKGROUND : LIGHT_BACKGROUND;
    const [openHiddenClasses, setOpenHiddenClasses] = React.useState(false);
    const [showHiddenClasses, setShowHiddenClasses] = React.useState(false);
    const [hiddenClasses, setHiddenClasses] = React.useState("");
    useEffect(() => {
        AsyncStorage.getItem('hiddenClasses').then((value) => {
            if (value !== null) {
                console.log('hiddenClasses', value);
                setShowHiddenClasses(true);
                setHiddenClasses(value);
            } else {
                setShowHiddenClasses(true);
                setHiddenClasses("");
            }
        });
    }, [])
    return (
        <>
            {showHiddenClasses &&
                <HiddenClassesModal isOpen={openHiddenClasses} onClose={() => setOpenHiddenClasses(false)}
                                    save={(text: string) => {
                                        console.log('Saving: ' + text);
                                        AsyncStorage.setItem('hiddenClasses', text).then(()=> {
                                            console.log('Saved');
                                        });
                                    }}
                                    initialValue={hiddenClasses}
                />}
            <SafeAreaView style={[styles.container, {backgroundColor: bgColor}]}>
                <VStack divider={<Divider bg={"gray.400"}/>} space="4">
                    {showHiddenClasses &&
                        <Button variant={"ghost"} onPress={(event) => {
                            setOpenHiddenClasses(true);
                        }}>Edit hidden classes</Button>}
                </VStack>
            </SafeAreaView>
        </>
    );
};

function HiddenClassesModal(props: any) {
    const [hiddenClasses, setHiddenClasses] = React.useState(props.initialValue);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const colorScheme = useColorScheme()
    const handleClose = () => {
        props.onClose();
    }
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={() => handleClose()} initialFocusRef={initialRef}
                   finalFocusRef={finalRef}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header>Edit Hidden Classes</Modal.Header>
                    <Modal.Body>
                        <Text color={"gray.500"}>Enter the class codes of the classes you want to hide, seperated with a
                            comma.</Text>
                        <FormControl>
                            <FormControl.Label>Classes</FormControl.Label>
                            <Input ref={initialRef} onChange={(e) => {
                                setHiddenClasses(e.nativeEvent.text);
                            }} defaultValue={props.initialValue} cursorColor={colorScheme === 'dark' ? 'white' : 'black'}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                handleClose();
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => {
                                handleClose();
                                props.save(hiddenClasses)
                            }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default Settings;
