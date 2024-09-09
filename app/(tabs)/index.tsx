import { Image, StyleSheet, Platform, Button } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { SetStateAction, useState } from "react"

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
      if ((!progress[i])) {
        progress[i] = true
        break
      }
      i++
    }
    
    if (progress[progress.length-1]) {
      setCurrentRewards(currentRewards + 1)
      progress.forEach((v, i) => progress[i] = !v)
    }

    await updateRewardsProgress()
  }

  return (
    <ThemedView style={styles.feed}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardRewards}>
          <ThemedText type="title">{currentRewards}</ThemedText>
          <ThemedText type="subtitle">Current</ThemedText>
          <ThemedText type="subtitle">Rewards</ThemedText>
        </ThemedView>
        <ThemedView style={styles.cardStack}>
          <ThemedView style={styles.cardInfo}>
            <ThemedView style={styles.cardCol}>
              <ThemedText type="subtitle">YOUR REWARD</ThemedText>
              <ThemedText>
                Only {progress.filter((value) => !value).length} more washes
                away from a free Jersey Shine Wash or Discounted upgrade!
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
      <Button
        onPress={addReward}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
  },
  feed: {
    flex: 3,
    alignItems: "center",
    gap: 10,
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    height: 200,
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 201,
    borderColor: "#ffffff",
    backgroundColor: "#128bee",
  },
  cardRewards: {
    width: "25%",
    height: 200,
    gap: 3,
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
  },
  cardProgress: {
    flexDirection: "row",
    height: 50,
    gap: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
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
