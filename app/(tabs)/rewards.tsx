"use client"

import { StyleSheet, Image, Button} from "react-native"
import { useState, useEffect } from "react"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { db } from "../../firebase"
import { collection, doc, getDoc } from "firebase/firestore"
import { useUser } from "@clerk/clerk-expo"
import { TopNav } from "@/components/TopNav"
import { useRouter } from 'expo-router'

export default function RewardScreen() {
  const { user } = useUser()
  const router = useRouter()
  const [currentRewards, setCurrentRewards] = useState(0)
  const [progress, setProgress] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const maxReward = currentRewards >= 3 ? 3 : currentRewards

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
      }
    }
    getRewardsProgress()
  }, [user, progress, currentRewards])

  return (
    <>
      <ThemedView style={styles.container}>
        <TopNav pageName="Rewards" />
        <Button
          onPress={() => {
            router.push('/camera')
          }}
          title={"Tap to Scan Rewards"}
          color="#128bee"
        />
        <ThemedView style={{ marginTop: 50 }} />
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardRewards}>
            <ThemedText type="title">{currentRewards}</ThemedText>
            <ThemedText type="subtitle">Current</ThemedText>
            <ThemedText type="subtitle">Rewards</ThemedText>
          </ThemedView>
          <ThemedView style={styles.cardInfo}>
            <ThemedView style={styles.header}>
              <ThemedText type="subtitle">NEXT REWARD</ThemedText>
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
          <Image
            source={require("@/assets/images/carwashgold.png")}
            style={styles.logo}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ paddingHorizontal: 15, marginTop: 50 }}>
        <ThemedView style={styles.currentRewards}>
          <ThemedText type="subtitle">Current Rewards</ThemedText>
          {currentRewards > 0 ? (
            <Button
              onPress={() => {
                router.push('/timer')
              }}
              title={"Redeem Reward"}
            />
          ) : (
            <ThemedText type="subtitle">No Rewards</ThemedText>
          )}
        </ThemedView>
        {Array.from({ length: maxReward }, (_, i) => (
          <ThemedView key={i} style={{ marginTop: 10, marginBottom: 10 }}>
            <ThemedView style={styles.myRewardBG1}>
              <ThemedView style={styles.myRewardBG2}>
                <Image
                  source={require("@/assets/images/carwashgold.png")}
                  style={styles.rewardIcon}
                />
                <ThemedText type="defaultSemiBold">
                  Free Jersey Shine or Discounted Express Service
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ))}
        <ThemedText type="small">
          Once reward is redeemed you have a 5 minute timer to present your
          reward to the cashier. Cannot be combined with any other offer.
        </ThemedText>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  currentRewards: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    gap: 25,
    marginLeft: 25,
    marginBottom: 25,
  },
  rewardIcon: {
    height: 50,
    width: 50,
    left: 0,
    bottom: 0,
  },
  myRewardBG1: {
    flexDirection: "row",
    height: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#ffffff",
    gap: 10,
  },
  myRewardBG2: {
    flexDirection: "row",
    height: 60,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "rgba(18,139,238,.6)",
    gap: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    height: 150,
    width: "80%",
  },
  cardRewards: {
    width: "30%",
    height: 125,
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#128bee",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  cardInfo: {
    flexDirection: "column",
    height: 125,
    width: "50%",
    gap: 25,
    justifyContent: "center",
    backgroundColor: "#0e64ab",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#0e64ab",
  },
  cardProgress: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#0e64ab",
  },
  progressImage: {
    height: 25,
    width: 25,
    bottom: 0,
    left: 0,
  },
  logo: {
    height: 125,
    width: "25%",
    bottom: 0,
    left: 0,
    backgroundColor: "#0e64ab",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
})
