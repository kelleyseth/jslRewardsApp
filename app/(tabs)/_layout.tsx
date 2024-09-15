import { Tabs } from "expo-router"
import React from "react"
import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"

export default function TabLayout() {
  const colorScheme = "dark"

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? '#128bee' : '#f4cb56'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "qr-code" : "qr-code-outline"}
              color={focused ? '#128bee' : '#f4cb56'}

            />
          ),
        }}
      />
    </Tabs>
  )
}