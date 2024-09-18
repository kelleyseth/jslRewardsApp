import { Image, View, type ViewProps } from "react-native"
import { ThemedText } from "./ThemedText"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Link } from "expo-router"

export type TopNavViewProps = ViewProps & {
  pageName?: string
}

export function TopNavView({
  style,
  pageName,
  ...otherProps
}: TopNavViewProps) {
  const backgroundColor = "#000000"
  //   const backgroundColor = "#f4cb56"

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
      <Link href="/user-info">
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
      <TabBarIcon name={"location-outline"} color={'#128bee'} />
    </View>
  )
}
