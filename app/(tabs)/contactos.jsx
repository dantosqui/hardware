import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Contactos() {
    const [contacts, setContacts] = useState([]);
    const [nroEmergencia, setNroEmergencia] = useState("");

    useEffect(() => {
        (async () => {
            setNroEmergencia(await AsyncStorage.getItem("nro"));
            
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers], // Include PhoneNumbers field
                });

                setContacts(data);
            }
        })();
    }, []);

    const keyExtractor = (item, idx) => {
        return item?.id?.toString() || idx.toString();
    };

    const cleanPhoneNumber = (nro) => {
        // Remove spaces, hyphens, and plus signs
        return nro.replace(/[\s\-+]/g, ''); // Use regex to remove spaces, hyphens, and '+' signs
    };

    const renderItem = ({ item }) => {
        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '';
        let cleanEmergencia
        if (nroEmergencia) {cleanEmergencia= cleanPhoneNumber(nroEmergencia)}
        else cleanEmergencia="0"
        const cleanedNumber = cleanPhoneNumber(phoneNumber);
        console.log(cleanedNumber,cleanEmergencia)

        return (
            <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                    {item.name || `${item.firstName || ''} ${item.middleName || ''} ${item.lastName || ''}`}
                </Text>
                {phoneNumber ? (
                    <Text style={styles.phoneText}>
                        {phoneNumber}
                        {cleanedNumber === cleanEmergencia ? ' ⚠️' : ''} {/* Compare directly with the cleaned emergency number */}
                    </Text>
                ) : null}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={<Text>No contacts found.</Text>}
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
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactText: {
        fontSize: 16,
    },
    phoneText: {
        fontSize: 14,
        color: '#555',
    },
});
