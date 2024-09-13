'use client'

import { StyleSheet, Image, Button } from "react-native"
import { useEffect, useState } from "react"
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

export default function HomeScreen() {
  const { hasPermission, requestPermission } = useCameraPermission()

  const [openCamera, setCameraState] = useState(false)

  const [qrcode, setqrCode] = useState("hello")

  const openRewardsCam = () => {
    setCameraState(true)
  }
  const closeRewardsCam = () => {
    setCameraState(false)
  }

  const updateCurrentPage = async () => {
    setCameraState(openCamera)
  }
  const device = useCameraDevice("back")

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      codes.forEach((c) => {
        if (c.value) {
          setqrCode(c.value)
          setCameraState(false)
        }
      })
    },
  })

  useEffect(() => {
    requestPermission()
    updateCurrentPage()
  }, [])

  if (!hasPermission) {
    return (
      <ThemedView style={styles.noCamAccess}>
        <ThemedText>Please allow camera access to scan rewards</ThemedText>
      </ThemedView>
    )
  }
  if (device == null) {
    return (
      <ThemedView style={styles.noCamAccess}>
        <ThemedText>Device not found</ThemedText>
      </ThemedView>
    )
  }

  return openCamera ? (
    <ThemedView style={styles.codeOverlay}>
      <Image
        source={require("@/assets/images/qrscan-overlay.png")}
        style={styles.camHole}
      />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
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
