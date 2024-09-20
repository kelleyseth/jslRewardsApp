"use client"

import { StyleSheet, Image } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { TopNav } from "@/components/TopNav"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Collapsible } from "@/components/Collapsible"

export default function MenuScreen() {
  return (
    <>
      <TopNav style={{ marginTop: 50 }} pageName="Menu" />
      <ParallaxScrollView>
        <ThemedView style={styles.container}>
          <Collapsible title="Express Services" open={true}>
            <ThemedView style={styles.supreme}>
              <ThemedText type="title">Interior Supreme</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Jersey Shine Car Wash</ThemedText>
                  <ThemedText>• Additional Vacuuming</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Seats Cleaned</ThemedText>
                  <ThemedText>• Doors Cleaned</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vinyl/Leather Dressing</ThemedText>
                  <ThemedText>• Premium Tire Shine</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.supreme}>
              <ThemedText type="title">Exterior Supreme</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Jersey Shine Car Wash</ThemedText>
                  <ThemedText>• Spray Wax</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Premium Tire Shine</ThemedText>
                  <ThemedText>• Rims Hand Cleaned</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Foam Cleaned Ext Windows</ThemedText>
                  <ThemedText>• Ext Vinyl Dressed</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Collapsible>
          <Collapsible title="Washes" open={true}>
            <ThemedView style={styles.ceramic}>
              <ThemedText type="title">Ceramic</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Cermaic Seal</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Tire Shine</ThemedText>
                  <ThemedText>• Rain-X</ThemedText>
                  <ThemedText>• Extreme Shine Wax</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Triple Foam Polish</ThemedText>
                  <ThemedText>• Sealer Wax</ThemedText>
                  <ThemedText>• Underbody Blast</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vacuum</ThemedText>
                  <ThemedText>• Windows</ThemedText>
                  <ThemedText>• Dash</ThemedText>
                  <ThemedText>• Door Jambs</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Wheels Cleaned</ThemedText>
                  <ThemedText>• Foam Bath</ThemedText>
                  <ThemedText>• Towel Dry</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.jerseyshine}>
              <ThemedText type="title">Jersey Shine</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Tire Shine</ThemedText>
                  <ThemedText>• Rain-X</ThemedText>
                  <ThemedText>• Extreme Shine Wax</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Triple Foam Polish</ThemedText>
                  <ThemedText>• Sealer Wax</ThemedText>
                  <ThemedText>• Underbody Blast</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vacuum</ThemedText>
                  <ThemedText>• Windows</ThemedText>
                  <ThemedText>• Dash</ThemedText>
                  <ThemedText>• Door Jambs</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Wheels Cleaned</ThemedText>
                  <ThemedText>• Foam Bath</ThemedText>
                  <ThemedText>• Towel Dry</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.deluxe}>
              <ThemedText type="title">Deluxe</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Triple Foam Polish</ThemedText>
                  <ThemedText>• Sealer Wax</ThemedText>
                  <ThemedText>• Underbody Blast</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vacuum</ThemedText>
                  <ThemedText>• Windows</ThemedText>
                  <ThemedText>• Dash</ThemedText>
                  <ThemedText>• Door Jambs</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Wheels Cleaned</ThemedText>
                  <ThemedText>• Foam Bath</ThemedText>
                  <ThemedText>• Towel Dry</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.basic}>
              <ThemedText type="title">Basic</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vacuum</ThemedText>
                  <ThemedText>• Windows</ThemedText>
                  <ThemedText>• Dash</ThemedText>
                  <ThemedText>• Door Jambs</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Wheels Cleaned</ThemedText>
                  <ThemedText>• Foam Bath</ThemedText>
                  <ThemedText>• Towel Dry</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <ThemedView style={styles.exterior}>
              <ThemedText type="title">Exterior</ThemedText>
              <ThemedView style={styles.services}>
                <ThemedView style={styles.row}>
                  <ThemedText>• Vacuum</ThemedText>
                  <ThemedText>• Windows</ThemedText>
                  <ThemedText>• Dash</ThemedText>
                  <ThemedText>• Door Jambs</ThemedText>
                </ThemedView>
                <ThemedView style={styles.row}>
                  <ThemedText>• Wheels Cleaned</ThemedText>
                  <ThemedText>• Foam Bath</ThemedText>
                  <ThemedText>• Towel Dry</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Collapsible>
        </ThemedView>
      </ParallaxScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  services: {
    height: "80%",
    width: "100%",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0)",
  },
  supreme: {
    height: 160,
    width: "100%",
    backgroundColor: "rgba(0,168,107,.7)",
    padding: 15,
  },
  ceramic: {
    height: 200,
    width: "100%",
    backgroundColor: "rgba(255,0,0,.7)",
    padding: 15,
  },
  jerseyshine: {
    height: 180,
    width: "100%",
    backgroundColor: "rgba(187,165,61,.7)",
    padding: 15,
  },
  deluxe: {
    height: 150,
    width: "100%",
    backgroundColor: "rgba(192,192,192,.7)",
    padding: 15,
  },
  basic: {
    height: 125,
    width: "100%",
    backgroundColor: "rgba(18,139,238,.7)",
    padding: 15,
  },
  exterior: {
    height: 125,
    width: "100%",
    backgroundColor: "rgba(105,105,105,.7)",
    padding: 15,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap:25
  },
  row: {
    flexDirection: "row",
    gap: 15,
    backgroundColor: "rgba(0,0,0,0)",
  },
})
