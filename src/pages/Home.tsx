import React from 'react';
import {Text, useToast} from "native-base";

import * as Sentry from "sentry-expo";

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
                try {
                    throw new Error("Test Error");
                }catch (e) {
                    Sentry.Native.captureException(e);
                }
            }}>Trigger Sentry Error</Button>
        </>
    );
};

export default Home;
