import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function AdminHomePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && user?.publicMetadata?.role !== "admin") {
            Alert.alert("Access Denied", "You are not authorized to view this page.");
            router.replace("/");
        }
    }, [user, isLoaded]);

    if (!isLoaded || user?.publicMetadata?.role !== "admin") return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, Admin 👋</Text>
            <Text style={styles.subtitle}>
                You can manage orders, users, and more here.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
        color: "#111827",
    },
    subtitle: {
        fontSize: 16,
        color: "#4B5563",
        textAlign: "center",
    },
});
