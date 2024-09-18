"use client"

import { ThemedView } from "@/components/ThemedView"
import { useClerk, useUser } from "@clerk/clerk-expo"
import { Alert, Button, StyleSheet, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { TopNavView } from "@/components/TopNav"
import { ThemedText } from "@/components/ThemedText"
import { Collapsible } from "@/components/Collapsible"

export default function UserInfo() {
  const { signOut } = useClerk()
  const { isSignedIn } = useUser()
  const router = useRouter()
  const { user } = useUser()
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newVisible, setNewVisible] = useState("Show")
  const [currentVisible, setCurrentVisible] = useState("Show")
  const [passwordNewVisibility, setNewPasswordVisibility] = useState(false)
  const [passwordCurrentVisibility, setCurrentPasswordVisibility] =
    useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")

  const passwordVisibilityEvent = (type: "current" | "new") => {
    if (type === "current") {
      setCurrentPasswordVisibility(!passwordCurrentVisibility)

      if (currentVisible === "Show") {
        setCurrentVisible("Hide")
        return
      }
      setCurrentVisible("Show")
    }
    if (type === "new") {
      setNewPasswordVisibility(!passwordNewVisibility)

      if (newVisible === "Show") {
        setNewVisible("Hide")
        return
      }
      setNewVisible("Show")
    }
  }
  const changePassword = () => {
    user
      ?.updatePassword({ currentPassword, newPassword })
      .then((response) => {
        Alert.alert("Success", "Password has been changed.")
        setCurrentPassword("")
        setNewPassword("")
      })
      .catch((error) => {
        Alert.alert("Error", error.errors[0].longMessage)
      })
  }

  const changeEmail = async () => {
    if (!user) return
    const userID = user.id
    user.emailAddresses[0].emailAddress = emailAddress
    Alert.alert("Success", "Email changed successfully")
  }

  useEffect(() => {
    if (!isSignedIn) router.dismissAll()
  }, [isSignedIn])

  return (
    <ThemedView style={styles.layout}>
      <TopNavView pageName="My Info" />
        <Collapsible title="Change Password">
          <ThemedView style={styles.group}>
            <TextInput
              autoCapitalize="none"
              value={currentPassword}
              placeholder="Current Password..."
              secureTextEntry={!passwordCurrentVisibility}
              onChangeText={(password) => setCurrentPassword(password)}
              style={styles.input}
              placeholderTextColor={"#ffffff"}
              textAlign="center"
              cursorColor={"#128bee"}
            />
            <ThemedText
              type="link"
              onPress={() => {
                passwordVisibilityEvent("current")
              }}
            >
              {`${currentVisible}` + " Current Password"}
            </ThemedText>
            <TextInput
              autoCapitalize="none"
              value={newPassword}
              placeholder="New Password..."
              secureTextEntry={!passwordNewVisibility}
              onChangeText={(password) => setNewPassword(password)}
              style={styles.input}
              placeholderTextColor={"#ffffff"}
              textAlign="center"
              cursorColor={"#128bee"}
            />
            <ThemedText
              type="link"
              onPress={() => {
                passwordVisibilityEvent("new")
              }}
            >
              {`${newVisible}` + " New Password"}
            </ThemedText>
            <Button title="Change Password" onPress={changePassword} />
          </ThemedView>
        </Collapsible>
        <Button title="Sign out" onPress={() => signOut()} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    gap: 50,
  },
  group: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 25,
    backgroundColor: "#3b3b3b",
    borderRadius: 25,
    paddingVertical: 25,
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
})
