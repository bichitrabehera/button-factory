import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setError("");
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Sign-up failed", "Please check your email and password.");
      setError("Failed to sign up. Please check your input.");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      setError("");
      const result = await signUp.attemptEmailAddressVerification({ code });

      console.log("Verification result:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/"); // Or wherever your app's home page is
      } else {
        setError("Verification incomplete. Please try again.");
        Alert.alert("Verification incomplete", "Please try again.");
      }
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err));
      console.error("Verification error:", error);

      // Handle already verified case
      if (error.errors?.[0]?.code === "identifier_already_verified") {
        console.log("User already verified. Redirecting...");
        router.replace("/sign-in");
      } else {
        setError("Invalid verification code.");
        Alert.alert("Invalid code", "The verification code is invalid.");
      }
    }
  };

  if (pendingVerification) {
    return (
      <View style={[styles.container, styles.verificationContainer]}>
        <View style={styles.verificationHeader}>
          <MaterialCommunityIcons
            name="email-check-outline"
            size={48}
            color="#0277BD"
            style={styles.verificationIcon}
          />
          <Text style={styles.verificationHeading}>Verify Your Email</Text>
        </View>

        <Text style={styles.verificationText}>
          We've sent a 6-digit code to your email address. Please enter it below
          to verify your account.
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="key-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={code}
              placeholder="XXXXXX"
              placeholderTextColor="#888"
              onChangeText={setCode}
              keyboardType="number-pad"
              autoFocus
              textContentType="oneTimeCode"
              maxLength={6}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={onVerifyPress}
          disabled={!code}
        >
          <Text style={styles.buttonText}>Verify Account</Text>
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendLink} onPress={onSignUpPress}>
          <Text style={styles.resendText}>Didn't receive a code? Resend</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Join ClearSpend to start tracking your expenses effortlessly
        </Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              value={emailAddress}
              placeholder="your@email.com"
              placeholderTextColor="#888"
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="#222"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Create a password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={setPassword}
              textContentType="password"
              autoComplete="password"
            />
          </View>
          <Text style={styles.passwordHint}>
            Use at least 8 characters with a mix of letters and numbers
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !(emailAddress && password) && styles.buttonDisabled,
          ]}
          onPress={onSignUpPress}
          disabled={!(emailAddress && password)}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/sign-in" style={styles.footerLink}>
          <Text style={styles.footerLinkText}> Sign In</Text>
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // Base container styles
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  verificationContainer: {
    justifyContent: "center",
    padding: 24,
  },

  // Header styles
  header: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  verificationHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  verificationIcon: {
    marginBottom: 16,
  },
  verificationHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  verificationText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },

  // Form styles
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#111827",
    fontSize: 16,
    paddingVertical: 12,
  },
  passwordHint: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },

  // Button styles
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.7,
  },
  verifyButton: {
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },

  // Footer/link styles
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
  footerLinkText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  resendLink: {
    marginTop: 24,
    alignSelf: "center",
  },
  resendText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },

  // Error styles
  error: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
});
