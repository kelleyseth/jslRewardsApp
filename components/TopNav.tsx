import { Image, View, type ViewProps } from "react-native"
import { ThemedText } from "./ThemedText"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Link } from "expo-router"

export type TopNavViewProps = ViewProps & {
  navHeader: "logo" | "pageName"
  title?: string
}

export function TopNavView({
  style,
  navHeader,
  title,
  ...otherProps
}: TopNavViewProps) {
  const backgroundColor = "#000000"
  //   const backgroundColor = "#f4cb56"

  if (navHeader === "logo")
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
        <Link href="/(user)">
          <TabBarIcon name={"person-circle-outline"} color={"#128bee"} />
        </Link>
        <Image
          source={require("@/assets/images/businesslogotransparent.png")}
          style={{ aspectRatio: 16 / 9, width: 75 }}
        />
        <TabBarIcon name={"home"} />
      </View>
    )
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
      <ThemedText type="title">{title}</ThemedText>
      <ThemedText type="title">{title}</ThemedText>
      <ThemedText type="title">{title}</ThemedText>
    </View>
  )
}
