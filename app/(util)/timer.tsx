import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { StyleSheet, Image, Button } from "react-native"
import CountDown from "react-native-countdown-timer-comp"
import { useState } from "react"
import { useRouter } from "expo-router"
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { useUser } from "@clerk/clerk-expo"
import { db } from "../../firebase"

export default function TimerScreen() {
  const [runningTimer, setRunningTimer] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const completeReward = () => {
    setRunningTimer(false)
    router.replace("/rewards")
  }

  const redeemReward = async () => {
    if (!user) return
    const docRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userRewards = docSnap.data().rewards
      await updateDoc(docRef, {
        rewards: userRewards - 1,
      })
    }
  }

  return (
    <ThemedView style={styles.timerContainer}>
      <Image
        source={require("@/assets/images/businesslogotransparent.png")}
        style={styles.businessLogo}
      />
      {runningTimer ? (
        <>
          <ThemedText type="title">Reward Redeemed</ThemedText>
          <ThemedText type="subtitle">
            Present to cashier to receive your reward!
          </ThemedText>
        </>
      ) : (
        <Button
          title="Press to redeem"
          onPress={() => {
            setRunningTimer(true)
            redeemReward()
          }}
        />
      )}
      <CountDown
        until={120}
        onFinish={completeReward}
        size={24}
        running={runningTimer}
        showSeparator
        separatorStyle={{color: '#128bee', fontSize: 36}}
        digitStyle={{backgroundColor:'#000'}}
        digitTxtStyle={{color: '#128bee', fontSize: 36}}
        timeToShow={['M','S']}
        timeLabels={{m: null, s: null}}

      />
      <Button onPress={completeReward} title="Close Reward" />
    </ThemedView>
  )
}
const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
    marginTop: 50,
    flex: 1,
  },
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    width: 250,
  },
})
