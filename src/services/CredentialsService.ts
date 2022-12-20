import * as SecureStore from 'expo-secure-store';

class CredentialsService {
    async getCredentials() {
        const username = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        if (username && password) {
            return {username, password};
        }
        return null;
    }
    async saveCredentials(username: string, password: string) {
        await SecureStore.setItemAsync('username', username);
        await SecureStore.setItemAsync('password', password);
    }

    async clearCredentials() {
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('password');
    }
    async hasCredentials() {
        const username = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        return username && password;
    }
}

export default new CredentialsService();
