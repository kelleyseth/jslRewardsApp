import { StyleSheet, Image, Button, Alert } from "react-native"
import { ThemedView } from "@/components/ThemedView"
import { CameraView, useCameraPermissions } from "expo-camera"
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useUser } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"
import { ThemedText } from "@/components/ThemedText"

export default function CameraScreen() {
  const qrCode =
    "Daily scan for rewards app created by Seth, are you even reading this"
  const qrCodeURLText = "https://me-qr.com/text/p5UvoHoI"
  const qrCodeURL = "https://me-qr.com/p5UvoHoI"
  const { user } = useUser()
  const router = useRouter()
  const [permission, requestPermission] = useCameraPermissions()

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

  if (!permission || !permission.granted) {
    return (
      <ThemedView style={styles.noCamAccess}>
        <ThemedText>Please allow camera access to scan rewards</ThemedText>
        <Button title="Grant Permission" onPress={requestPermission} />
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.codeOverlay}>
      <Image
        source={require("@/assets/images/qrscan-overlay.png")}
        style={styles.camHole}
      />
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={(code) => {
          console.log(code.data)
          console.log(code.raw)
          if (code.data === qrCodeURL || code.data === qrCodeURLText)
            fetch(qrCodeURLText).then(function (response) {
              response.text().then(function (text) {
                const result = text.match(qrCode)
                if (result) {
                  if (result[0] === qrCode) {
                    addRewards()
                    Alert.alert(
                      "Scan Successful",
                      "Thank you for visiting today!"
                    )
                  }
                }
              })
            })
          else
            Alert.alert(
              "Invalid QR Code",
              "You are not scanning the proper QR Code to receive a reward!"
            )
          router.replace("/rewards")
        }}
      />
      <ThemedView style={styles.close}>
        <Button
          onPress={() => {
            router.replace("/rewards")
          }}
          title="Close Scan"
          color="#128bee"
        />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
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
  noCamAccess: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100%",
    minWidth: "100%",
    backgroundColor: "#000000",
    gap: 50,
  },
})
