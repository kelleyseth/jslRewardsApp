"use client"
import React, { useState } from "react"
import { Alert, Button, StyleSheet, TextInput, Image } from "react-native"
import { useAuth, useSignIn } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [error, setError] = useState("")
  const [visible, setVisible] = useState("Show")
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/")
  }

  // Send the password reset code to the user's email
  async function create() {
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true)
        setError("")
        Alert.alert(
          "Code Emailed",
          "You should receive a code shortly with a code to reset your password."
        )
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
        Alert.alert("Error", error)
      })
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset() {
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId })
          setError("")
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
        Alert.alert("Error", error)
      })
  }

  const passwordVisibilityEvent = () => {
    setPasswordVisibility(!passwordVisibility)

    if (visible === "Show") {
      setVisible("Hide")
      return
    }
    setVisible("Show")
  }

  return !successfulCreation ? (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/businesslogotransparent.png")}
        style={styles.businessLogo}
      />
      <TextInput
        autoCapitalize="none"
        value={email}
        inputMode="email"
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmail(emailAddress)}
        style={styles.input}
        placeholderTextColor={"#ffffff"}
        textAlign="center"
        cursorColor={"#128bee"}
      />
      <Button title="Send Reset Code" onPress={create} />
    </ThemedView>
  ) : (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/businesslogotransparent.png")}
        style={styles.businessLogo}
      />
      <ThemedView style={styles.group}>
        <TextInput
          autoCapitalize="none"
          value={password}
          placeholder="New Password..."
          secureTextEntry={!passwordVisibility}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
          placeholderTextColor={"#ffffff"}
          textAlign="center"
          cursorColor={"#128bee"}
        />
        <ThemedText type="link" onPress={passwordVisibilityEvent}>
          {`${visible}` + " Password"}
        </ThemedText>
      </ThemedView>
      <TextInput
        autoCapitalize="none"
        inputMode="numeric"
        value={code}
        placeholder="Code..."
        onChangeText={(emailCode) => setCode(emailCode)}
        style={styles.input}
        placeholderTextColor={"#ffffff"}
        textAlign="center"
        cursorColor={"#128bee"}
      />
      <Button title="Reset Password" onPress={reset} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 100,
    marginTop: 125
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
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    width: 250,
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
})
