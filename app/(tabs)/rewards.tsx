"use client"

import { StyleSheet, Image, Button } from "react-native"
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
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { useUser } from "@clerk/clerk-expo"

export default function HomeScreen() {
  // const { hasPermission, requestPermission } = useCameraPermission()
  // const device = useCameraDevice("back")
  const { user } = useUser()
  const [openCamera, setCameraState] = useState(false)
  const [scannedCode, setScannedCode] = useState("")
  const qrCode  = 'Daily scan for rewards app created by Seth, are you even reading this?'

  const addRewards = async () => {
    if (!user) return
    const docRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userProgress = docSnap.data().progress
      const userRewards = docSnap.data().rewards

      let i = 0

      while (true) {
        if (!userProgress[i]) {
          userProgress[i] = true
          break
        }
        i++
      }

      if (userProgress[userProgress.length - 1]) {
        await updateDoc(docRef, {
          progress: userProgress.map(() => false),
          rewards: userRewards + 1,
        })
      } else {
        await updateDoc(docRef, {
          progress: userProgress,
        })
      }
    }
  }

  const openRewardsCam = () => {
    setCameraState(true)
  }

  const closeRewardsCam = () => {
    setCameraState(false)
    addRewards()
  }

  // const codeScanner = useCodeScanner({
  //   codeTypes: ["qr", "ean-13"],
  //   onCodeScanned: (codes) => {
  //     codes.forEach((c) => {
  //       if (c.value) {
  //         setScannedCode(c.value)
  //         setCameraState(false)
  //         if(scannedCode === qrCode)
  //           addRewards()
  //         return
  //       }
  //     })
  //   },
  // })

  // useEffect(() => {
  //   requestPermission()
  // }, [])

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
    <ThemedView style={styles.noCamAccess}>
      <Button onPress={openRewardsCam} title="Scan Rewards" color="#128bee" />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
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
})
