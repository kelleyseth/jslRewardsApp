import { useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { TextInput, Button, StyleSheet } from "react-native"
import React from "react"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { NodePath } from "@babel/core"

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [visible, setVisible] = React.useState("Show")
  const [passwordVisibility, setPasswordVisibility] = React.useState(false)

  const passwordVisibilityEvent = () => {
    setPasswordVisibility(!passwordVisibility)
    
    if(visible === 'Show')
    {
      setVisible('Hide')
      return
    }
    setVisible('Show')
  }

  const onSignInPress = React.useCallback(async () => {
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
    }
  }, [isLoaded, emailAddress, password])

  return (
    <ThemedView style={styles.signin}>
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
        <ThemedText type="link" onPress={passwordVisibilityEvent}>
          {`${visible}` + " Password"}
        </ThemedText>
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
  },
  noAccount: {
    alignItems: "center",
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    gap: 10
  }
})
