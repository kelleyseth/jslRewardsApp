"use client"

import { StyleSheet, Image, Button, Alert, Modal } from "react-native"
import { useState, useEffect } from "react"
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from "react-native-vision-camera"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { db } from "../../firebase"
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { useUser } from "@clerk/clerk-expo"
import { TopNavView } from "@/components/TopNav"
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"

export default function RewardScreen() {
  // const { hasPermission, requestPermission } = useCameraPermission()
  // const device = useCameraDevice("back")
  const { user } = useUser()
  const [openCamera, setCameraState] = useState(false)
  const qrCode =
    "Daily scan for rewards app created by Seth, are you even reading this?"
  const [toggleScanButton, setToggleScanButton] = useState(false)
  const [toggleRedeemButton, setToggleRedeemButton] = useState(false)
  const [currentRewards, setCurrentRewards] = useState(0)
  const [progress, setProgress] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [timerKey, setTimerKey] = useState(0)
  const [runningTimer, setRunningTimer] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const maxReward = currentRewards >= 3 ? 3 : currentRewards

  const addRewards = async () => {
    if (!user) return
    const docRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      let i = 0

      while (true) {
        if (!progress[i]) {
          progress[i] = true
          break
        }
        i++
      }

      if (progress[progress.length - 1]) {
        await updateDoc(docRef, {
          progress: progress.map(() => false),
          rewards: currentRewards + 1,
        })
      } else {
        await updateDoc(docRef, {
          progress: progress,
        })
      }
    }
  }

  const redeemReward = async () => {
    if (!user) return
    const docRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        rewards: currentRewards - 1,
      })
    }
    setModalVisible(true)
    setRunningTimer(true)
  }

  const closeRewardsCam = () => {
    setCameraState(false)
    addRewards()
    disableButton("scan", 1000)
    Alert.alert("Scan Successful", "Thank you for visiting today!")
  }

  const disableButton = (button: "scan" | "redeem", time: number) => {
    if (button === "scan") {
      setToggleScanButton(true)
      setTimeout(() => setToggleScanButton(false), time)
    } else if (button === "redeem") {
      setToggleRedeemButton(true)
      setTimeout(() => setToggleRedeemButton(false), time)
    }
  }

  // const codeScanner = useCodeScanner({
  //   codeTypes: ["qr", "ean-13"],
  //   onCodeScanned: (codes) => {
  //     codes.forEach((c) => {
  //       if (c.value) {
  //         setCameraState(false)
  //         if (c.value === qrCode) {
  //           addRewards()
  // Alert.alert("Scan Successful", "Thank you for visiting today!")

  //           disableButton('scan', 60000)
  //         } else {
  //           Alert.alert(
  //             "Invalid QR Code",
  //             "You are not scanning the proper QR Code to receive a reward!"
  //           )
  //         }
  //         return
  //       }
  //     })
  //   },
  // })

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
    // requestPermission()
  }, [user, progress, currentRewards])

  // if (!hasPermission) {
  //   return (
  //     <ThemedView style={styles.noCamAccess}>
  //       <ThemedText>Please allow camera access to scan rewards</ThemedText>
  //     </ThemedView>
  //   )
  // }
  // if (device == null) {
  //   return (
  //     <ThemedView style={styles.noCamAccess}>
  //       <ThemedText>Device not found</ThemedText>
  //     </ThemedView>
  //   )
  // }

  return openCamera ? (
    <ThemedView style={styles.codeOverlay}>
      <Image
        source={require("@/assets/images/qrscan-overlay.png")}
        style={styles.camHole}
      />
      {/* <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      /> */}
      <ThemedView style={styles.close}>
        <Button onPress={closeRewardsCam} title="Close Scan" color="#128bee" />
      </ThemedView>
    </ThemedView>
  ) : (
    <>
      <>
        <ThemedView style={styles.container}>
          <TopNavView pageName="Rewards" />
          <Button
            onPress={() => {
              setCameraState(true)
            }}
            disabled={toggleScanButton}
            title={!toggleScanButton ? "Tap to Scan Rewards" : "Reward Scanned"}
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
        <ThemedView style={{ marginTop: 50 }} />
        <ThemedView style={styles.currentRewards}>
          <ThemedText type="title">Current Rewards</ThemedText>
          {currentRewards > 0 ? (
            <Button
              onPress={() => {
                redeemReward()
                disableButton("redeem", 3000) // testing
                // disableButton('redeem', 300000)
              }}
              disabled={toggleRedeemButton}
              title={!toggleRedeemButton ? "Redeem Rewards" : "Reward Redeemed"}
            />
          ) : (
            <ThemedText type="subtitle">No Rewards</ThemedText>
          )}
        </ThemedView>
        {Array.from({ length: maxReward }, (_, i) => (
          <ThemedView key={i} style={{ marginTop: 10 }}>
            <ThemedView style={styles.myReward}>
              <Image
                source={require("@/assets/images/carwashgold.png")}
                style={styles.rewardIcon}
              />
              <ThemedText type="defaultSemiBold">
                Free Jersey Shine or Discounted Express Service
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Reward Closed", "Enjoy your free wash!")
          setModalVisible(!modalVisible)
        }}
      >
        <ThemedView style={styles.timerContainer}>
          <Image
            source={require("@/assets/images/businesslogotransparent.png")}
            style={styles.businessLogo}
          />
          <ThemedText type="title">Reward Redeemed</ThemedText>
          <ThemedText type="subtitle">
            Present to cashier to receive your reward!
          </ThemedText>
          <CountdownCircleTimer
            key={timerKey}
            isPlaying={runningTimer}
            duration={20} //testing
            // duration={300}
            colors={"#128bee"}
            strokeWidth={8}
            onComplete={() => {
              setTimerKey(timerKey + 1)
              setRunningTimer(false)
              setModalVisible(false)
            }}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60)
              const seconds = remainingTime % 60

              return (
                <>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ paddingBottom: 15 }}
                  >
                    Time Remaining
                  </ThemedText>
                  <ThemedText type="title">
                    {`${minutes}:` +
                      (seconds < 10 ? `0${seconds}` : `${seconds}`)}
                  </ThemedText>
                </>
              )
            }}
          </CountdownCircleTimer>
          <Button
            onPress={() => {
              setModalVisible(false)
            }}
            title="Close Reward"
          />
        </ThemedView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 75,
  },
  businessLogo: {
    aspectRatio: 16 / 9,
    height: 150,
    width: 250,
  },
  currentRewards: {
    flexDirection: "row",
    marginTop: 50,
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
  myReward: {
    flexDirection: "row",
    height: 75,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#128bee",
    gap: 10,
  },
  noCamAccess: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "#000000",
    gap: 50,
  },
  codeOverlay: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  camHole: {
    height: 280,
    width: 310,
    bottom: "30%",
    left: "15%",
    right: "15%",
    position: "absolute",
    zIndex: 1,
  },
  close: {
    position: "absolute",
    bottom: 45,
    left: "35%",
    right: "35%",
    zIndex: 2,
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
