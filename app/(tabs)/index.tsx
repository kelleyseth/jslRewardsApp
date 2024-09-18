"use client"

import { Image, StyleSheet } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useEffect, useState } from "react"
import { TopNavView } from "@/components/TopNav"
import { useUser } from "@clerk/clerk-expo"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

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
  const { user } = useUser()

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
      <ThemedView style={styles.feed}>
        <TopNavView />
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardRewards}>
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
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
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
