import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function PostAuthRedirect() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const role = user.publicMetadata?.role;

        if (role === "admin") {
            router.replace("/(admin)");
        } else {
            router.replace("/(home)");
        }
    }, [isLoaded]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
