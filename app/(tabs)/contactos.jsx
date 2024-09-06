import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';
import Contacts from 'react-native-contacts';

export default function Contactos() {
    const [contacts, setContacts] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                        {
                            title: "Contacts Permission",
                            message: "This app would like to view your contacts.",
                            buttonPositive: "OK",
                        }
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Contacts permission denied");
                        return;
                    }
                }

                // Check if Contacts is correctly imported
                

                // Fetch contacts if permission is granted
                Contacts.getAll().then(contactss => {
                    setContacts(contactss);
                }).catch(error => {
                    console.log("Error fetching contacts: ", error);
                });
            } catch (err) {
                console.warn(err);
            }
        };

        fetchContacts(); // Call the function when the component mounts
    }, []);

    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
    };

    const renderItem = ({ item }) => {
        return <Text>{item.displayName}</Text>; // Adjust according to your Contact component
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
});
