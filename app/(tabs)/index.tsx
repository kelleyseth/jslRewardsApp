"use client"

import { Image, StyleSheet } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useEffect, useState } from "react"
import { TopNav } from "@/components/TopNav"
import { useUser } from "@clerk/clerk-expo"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useRouter } from "expo-router"

export default function HomeScreen() {
  const [currentRewards, setCurrentRewards] = useState(0)
  const [progress, setProgress] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    async function getRewardsProgress() {
      if (!user) return
      const docRef = doc(collection(db, "users"), user.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userProgress = docSnap.data().progress
        const userRewards = docSnap.data().rewards
        setProgress(userProgress)
        setCurrentRewards(userRewards)
      } else {
        await setDoc(docRef, { progress: progress, rewards: currentRewards })
      }
    }
    getRewardsProgress()
  }, [user, progress, currentRewards])

  return (
    <>
      {isSignedIn ? (
        <ThemedView style={styles.feed}>
          <TopNav />
          <ThemedView style={styles.card}>
            <ThemedView style={styles.cardRewards}>
              <ThemedText
                style={styles.rewards}
                onPress={() => {
                  router.push("/rewards")
                }}
              />
              <ThemedText type="title">{currentRewards}</ThemedText>
              <ThemedText type="subtitle">Current</ThemedText>
              <ThemedText type="subtitle">Rewards</ThemedText>
            </ThemedView>
            <ThemedView style={styles.cardStack}>
              <ThemedView style={styles.cardInfo}>
                <Image
                  source={require("@/assets/images/carwashgold.png")}
                  style={styles.logo}
                />
                <ThemedView style={styles.cardCol}>
                  <ThemedText type="subtitle">YOUR REWARD</ThemedText>
                  <ThemedText>
                    Only {progress.filter((value) => !value).length} more washes
                    away from a free Jersey Shine Wash or Discounted Express
                    Service!
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.cardProgress}>
                {progress.map((value, index) => (
                  <Image
                    key={index}
                    source={
                      value
                        ? require("@/assets/images/check.png")
                        : require("@/assets/images/cancel.png")
                    }
                    style={styles.progressImage}
                  />
                ))}
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.menuCard}>
            <ThemedText
              style={styles.menuHeader}
              type="subtitle"
              onPress={() => {
                router.push("/menu")
              }}
            >
              Menu
            </ThemedText>
            <Image
              source={require("@/assets/images/menu-banner.webp")}
              style={styles.menuBannerImage}
            />
          </ThemedView>
        </ThemedView>
      ) : (
        router.replace("/(home)")
      )}
    </>
  )
}

const styles = StyleSheet.create({
  rewards: {
    zIndex: 1,
    height: 200,
    position: "absolute",
    width: "100%",
  },
  menuHeader: {
    position: "absolute",
    zIndex: 1,
    height: 185,
    width: "100%",
    paddingHorizontal: 25,
    backgroundColor: "rgba(0,0,0,0)",
  },
  menuBannerImage: {
    height: 150,
    width: "100%",
  },
  menuCard: {
    position: "relative",
    height: 185,
    width: "90%",
    marginTop: 90,
    borderColor: "#128bee",
    borderWidth: 1,
  },
  logo: {
    height: 75,
    width: 75,
    bottom: 0,
    left: 0,
  },
  feed: {
    flex: 3,
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    height: 200,
    width: "100%",
  },
  cardRewards: {
    width: "25%",
    height: 200,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#128bee",
  },
  cardStack: {
    width: "75%",
    height: 200,
  },
  cardInfo: {
    flexDirection: "row",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e64ab",
    borderStyle: "dashed",
    borderBottomColor: "#f4cb56",
    borderBottomWidth: 1,
    gap: 10,
  },
  cardProgress: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#000000",
    borderStyle: "solid",
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  progressImage: {
    height: 25,
    width: 25,
    bottom: 0,
    left: 0,
  },
  cardCol: {
    width: "75%",
    backgroundColor: "#0e64ab",
    gap: 5,
  },
})
