import * as React from "react"
import { TextInput, Button, StyleSheet, Image, Alert } from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [validPassword, isValidPassword] = React.useState(true)
  const [visible, setVisible] = React.useState("Show")
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState("")

  const passwordVisibilityEvent = () => {
    setPasswordVisibility(!passwordVisibility)

    if (visible === "Show") {
      setVisible("Hide")
      return
    }
    setVisible("Show")
  }

  const onSignUpPress = async () => {
    if (password.length < 8) {
      isValidPassword(false)
      return
    } else {
      isValidPassword(true)
    }
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      Alert.alert('Error', err.errors[0].message)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace("/")
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <ThemedView style={styles.signup}>
      <Image
        source={require("@/assets/images/businesslogotransparent.png")}
        style={styles.businessLogo}
      />
      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            inputMode="email"
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
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
            <ThemedText type="link" onPress={passwordVisibilityEvent}>
              {`${visible}` + " Password"}
            </ThemedText>
          </ThemedView>
          <Button title="Sign Up" onPress={onSignUpPress} />
          {!validPassword ? (
            <ThemedText>Password must be at least 8 characters</ThemedText>
          ) : (
            <ThemedText></ThemedText>
          )}
        </>
      )}
      {pendingVerification && (
        <>
          <ThemedText style={styles.verify}>
            You should receive an email shortly with a verification code. Please
            enter the code to continue with signup.
          </ThemedText>
          <TextInput
            autoCapitalize="none"
            value={code}
            inputMode="numeric"
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
            style={styles.input}
            placeholderTextColor={"#ffffff"}
            textAlign="center"
            cursorColor={"#128bee"}
          />
          <Button title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  signup: {
    display: "flex",
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
    height: 50
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  verify: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    width: 250
  },
})
