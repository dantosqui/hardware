import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const nroEmergencia = AsyncStorage.getItem("nro"); // Define the emergency number for comparison

export default function Contactos() {
    const [contacts, setContacts] = useState([]);
    console.log("nro",AsyncStorage.getItem("nro"))
    
    useEffect(() => {
        (async () => {
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
        // Clean the phone number by removing spaces and plus signs
        return nro.replace(/[\s+]/g, ''); // Use regex to remove spaces and '+'
    };

    const renderItem = ({ item }) => {
        const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : '';
        const cleanedNumber = cleanPhoneNumber(phoneNumber);

        return (
            <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                    {item.name || `${item.firstName || ''} ${item.middleName || ''} ${item.lastName || ''}`}
                </Text>
                {phoneNumber ? (
                    <Text style={styles.phoneText}>
                        {phoneNumber}
                        {cleanedNumber === nroEmergencia ? ' ⚠️' : ''} {/* Compare directly with the cleaned emergency number */}
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
