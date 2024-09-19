import { Image, Linking, Platform, View, type ViewProps } from "react-native"
import { ThemedText } from "./ThemedText"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Link } from "expo-router"

export type TopNavProps = ViewProps & {
  pageName?: string
}

export function TopNav({
  style,
  pageName,
  ...otherProps
}: TopNavProps) {
  const backgroundColor = "#000000"

  return (
    <View
      style={[
        {
          flexDirection: "row",
          backgroundColor,
          height: 75,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
        },
        style,
      ]}
      {...otherProps}
    >
      <Link href="/account">
        <TabBarIcon name={"person-circle-outline"} color={"#128bee"} />
      </Link>
      {pageName ? (
        <ThemedText type="subtitle">{pageName}</ThemedText>
      ) : (
        <Image
          source={require("@/assets/images/businesslogotransparent.png")}
          style={{ aspectRatio: 16 / 9, height: 50, width: 75 }}
        />
      )}
      <TabBarIcon
        name={"location-outline"}
        color={"#128bee"}
        onPress={() => {
          const scheme = Platform.select({
            ios: "maps://0,0?q=",
            android: "geo:0,0?q=",
          })
          const latLng = `${39.90220},${-74.83670}`
          const url = Platform.select({
            ios: `${scheme}@${latLng}`,
            android: `${scheme}${latLng}()`,
          })

          Linking.openURL(url)
        }}
      />
    </View>
  )
}
