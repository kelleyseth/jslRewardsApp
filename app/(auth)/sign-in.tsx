import { useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { TextInput, Button, StyleSheet, Image, Alert } from "react-native"
import { useState, useCallback } from "react"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState("Show")
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [visibleImage, setVisibleImage] = useState(true)

  const passwordVisibilityEvent = () => {
    setPasswordVisibility(!passwordVisibility)

    if (visible === "Show") {
      setVisible("Hide")
      return
    }
    setVisible("Show")
  }

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      Alert.alert("Error", err.errors[0].message)
    }
  }, [isLoaded, emailAddress, password])

  return (
    <ThemedView style={styles.signin}>
      <Image
        source={require("@/assets/images/businesslogotransparent.png")}
        style={styles.businessLogo}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        inputMode="email"
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.input}
        placeholderTextColor={"#ffffff"}
        textAlign="center"
        cursorColor={"#128bee"}
      />
      <ThemedView style={styles.group}>
        <TextInput
          autoCapitalize="none"
          value={password}
          placeholder="Password..."
          secureTextEntry={!passwordVisibility}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          placeholderTextColor={"#ffffff"}
          textAlign="center"
          cursorColor={"#128bee"}
        />
        <ThemedView style={{flexDirection:'row', gap:25, justifyContent: "space-between" }}>
          <ThemedText type="link" onPress={() => {router.push('/forgot-password')}}>
            Forgot Password
          </ThemedText>
          <ThemedText type="link" onPress={passwordVisibilityEvent}>
            {`${visible}` + " Password"}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <Button title="Sign In" onPress={onSignInPress} />
      <ThemedView style={styles.noAccount}>
        <ThemedText>Don't have an account?</ThemedText>
        <Link href="/sign-up">
          <ThemedText type="link">Sign up</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  signin: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
  },
  input: {
    width: "75%",
    borderBottomColor: "#128bee",
    borderStyle: "solid",
    borderBottomWidth: 3,
    borderRadius: 25,
    color: "#ffffff",
    height: 50,
    textAlign: "center",
  },
  noAccount: {
    alignItems: "center",
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    width: 250,
  },
})
