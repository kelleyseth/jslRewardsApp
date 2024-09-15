import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SignedIn, SignedOut } from "@clerk/clerk-expo"
import { Link, Redirect } from "expo-router"
import { Image, StyleSheet } from "react-native"

export default function HomePage() {

    return (
      <ThemedView style={StyleSheet.absoluteFill}>
        <SignedIn>
      <Redirect href={"/(tabs)"} />
      {/* <Stack.Screen name="+not-found" /> */}
      </SignedIn>
        <SignedOut>
          <ThemedView style={styles.div}>
            <Image
              source={require("@/assets/images/businesslogotransparent.png")}
              style={styles.businessLogo}
            />
            <ThemedView style={styles.signin}>
              <Link href="/(auth)/sign-in">
                <ThemedView style={styles.signinBG}>
                  <ThemedText>Sign In</ThemedText>
                </ThemedView>
              </Link>
            </ThemedView>
            <ThemedView style={styles.signup}>
              <ThemedText>Don't have an account?</ThemedText>
              <Link href="/(auth)/sign-up">
                <ThemedText type='link'>Sign Up</ThemedText>
              </Link>
            </ThemedView>
          </ThemedView>
        </SignedOut>
      </ThemedView>
    )
}

const styles = StyleSheet.create({
  div: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    gap: 1,
    alignItems: "center",
  },
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    justifyContent: "center",
    alignSelf: "center",
    top: "30%",
  },
  signin: {
    position: "absolute",
    bottom: "40%",
  },
  signup: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    bottom: "5%",
    gap: 5,
  },
  signinBG: {
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#128bee",
    borderRadius: 50,
  },
})
