import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Searchbar,
  Text,
  useTheme,
  Button,
  Card,
  IconButton,
} from "react-native-paper";

import { useCustomerManager } from "../../hooks/useCustomerManager";
import { Customer } from "../../models/Customer";

type NavigationProp = NativeStackNavigationProp<{ AddCustomer: undefined }>;

const RenderItem = ({ item }: { item: Customer }) => (
  <Card style={styles.card} mode="contained">
    <Card.Title
      title={item.customer_name}
      subtitle={`${item.mobile} • ${item.createdAt.toLocaleDateString()}`}
    />
  </Card>
);

const SearchRight = () => {
  const { clearFilters } = useCustomerManager();
  const theme = useTheme();

  return (
    <IconButton
      icon="close"
      onPress={clearFilters}
      iconColor={theme.colors.error}
    />
  );
};

const CustomerList = () => {
  const navigation = useNavigation<NavigationProp>();
  const { customers, searchCustomers, searchTerm } = useCustomerManager();

  navigation.setOptions({
    headerRight: () => (
      <Button
        mode="text"
        icon="plus"
        onPress={() => navigation.navigate("AddCustomer")}
      >
        Add
      </Button>
    ),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search by name or phone"
          onChangeText={searchCustomers}
          value={searchTerm}
          style={styles.search}
          right={() => (searchTerm ? <SearchRight /> : null)}
        />

        {customers.length === 0 ? (
          <Text style={styles.noResults}>No customers found.</Text>
        ) : (
          <FlatList
            data={customers}
            keyExtractor={(item) => item._id.toHexString()}
            renderItem={RenderItem}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  search: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 8,
    borderRadius: 8,
  },
  noResults: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
  flatListContent: {
    paddingBottom: 40,
  },
});

export default CustomerList;
