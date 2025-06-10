import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SignOutButton } from '@/components/SignOutButton'


export default function AdminLayout() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && user?.publicMetadata?.role !== "admin") {
            router.replace("/(home)"); // redirect unauthorized users
        }
    }, [isLoaded, user]);

    // Don't show layout until user is loaded
    if (!isLoaded || user?.publicMetadata?.role !== "admin") return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Fabbricana Admin Panel</Text>
                <SignOutButton />
            </View>
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: "#006995",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },
});
