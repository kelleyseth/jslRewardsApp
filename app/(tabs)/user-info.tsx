"use client"

import { ThemedView } from "@/components/ThemedView"
import { useClerk, useUser } from "@clerk/clerk-expo"
import { Button, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { TopNavView } from "@/components/TopNav"

export default function UserInfo() {
  const { signOut } = useClerk()
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) router.dismissAll()
  }, [isSignedIn])

  return (
    <ThemedView style={styles.layout}>
      <TopNavView pageName="My Info" />
      <Button title="Sign out" onPress={() => signOut()} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    marginTop: 50
  },
})
