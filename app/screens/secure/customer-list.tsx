import React, { useLayoutEffect } from "react";
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
import { useAppNavigation } from "../../hooks/useNavigation";
import { Customer } from "../../models/Customer";

const RenderItem = ({
  item,
  onPress,
}: {
  item: Customer;
  onPress: () => void;
}) => {
  return (
    <Card style={styles.card} mode="contained" onPress={onPress}>
      <Card.Title
        title={item.customer_name}
        subtitle={`${item.mobile} • ${item.createdAt.toLocaleDateString()}`}
      />
    </Card>
  );
};

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
  const navigation = useAppNavigation();
  const { customers, searchCustomers, searchTerm } = useCustomerManager();

  useLayoutEffect(() => {
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
  }, [navigation]);

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
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                onPress={() =>
                  navigation.navigate("CustomerDetail", {
                    customerId: item._id.toHexString(),
                  })
                }
              />
            )}
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
