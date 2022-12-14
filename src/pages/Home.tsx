import React from 'react';
import {Text, useToast} from "native-base";

import {
    Button
} from "native-base";

const Home = () => {
    const toast = useToast();
    return (
        <>
            <Text>Home</Text>
            <Button onPress={()=> {
                toast.show({
                    title: "Triggering error",
                });
                throw new Error("Test Error");
            }}>Trigger Sentry Error</Button>
        </>
    );
};

export default Home;
