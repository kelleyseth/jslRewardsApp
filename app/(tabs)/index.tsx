"use client"

import { Image, StyleSheet } from "react-native"

import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SetStateAction, useEffect, useState } from "react"
import { TopNavView } from "@/components/TopNav"

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

  const updateRewardsProgress = async () => {
    const myProgress: SetStateAction<boolean[]> = []

    progress.forEach((v) => {
      myProgress.push(v)
    })

    setProgress(myProgress)
  }

  const addReward = async () => {
    let i = 0

    while (true) {
      if (!progress[i]) {
        progress[i] = true
        break
      }
      i++
    }

    if (progress[progress.length - 1]) {
      setCurrentRewards(currentRewards + 1)
      progress.forEach((v, i) => (progress[i] = !v))
    }

    await updateRewardsProgress()
  }

  useEffect(() => {
    updateRewardsProgress()
  }, [])

    return (
      <>
        <ThemedView style={styles.feed}>
          <TopNavView navHeader="logo" />
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
