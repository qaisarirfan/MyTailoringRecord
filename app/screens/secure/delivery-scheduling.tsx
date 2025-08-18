import React, { useState } from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  FAB,
  Portal,
  Dialog,
} from "react-native-paper";
import { BSON } from "realm";
import { useDeliverySchedule } from "../../hooks/useDeliverySchedule";
import { useCustomerManager } from "../../hooks/useCustomerManager";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { RouteProp, useRoute } from "@react-navigation/native";

type ParamList = {
  DeliveryScheduling: {
    customerId: string;
  };
};

export const DeliveryScheduling = () => {
  const route = useRoute<RouteProp<ParamList, "DeliveryScheduling">>();
  const customerId = new BSON.ObjectId(route.params.customerId);

  const { schedules, addSchedule, toggleDelivered } = useDeliverySchedule();
  const { customers } = useCustomerManager(); // list of customers from Realm
  const defaultStyles = useDefaultStyles();

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSave = () => {
    if (customerId && date) {
      const customer = customers.find((c) => c._id.equals(customerId));
      if (customer) {
        addSchedule(customer, date);
      }
    }
    setVisible(false);
    setDate(undefined);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }} mode="outlined">
            <Card.Title
              title={item.customer.customer_name}
              subtitle={`Delivery: ${item.deliveryDate.toDateString()}`}
              left={(props) => (
                <Checkbox
                  status={item.delivered ? "checked" : "unchecked"}
                  onPress={() => toggleDelivered(item._id)}
                />
              )}
            />
          </Card>
        )}
      />

      {/* Floating Button */}
      <Portal>
        <FAB
          icon="plus"
          style={{ position: "absolute", right: 16, bottom: 16 }}
          onPress={() => setVisible(true)}
        />
      </Portal>

      {/* Dialog for adding schedule */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Assign Delivery</Dialog.Title>
          <Dialog.Content>
            {/* Date picker */}
            <DateTimePicker
              mode="single"
              date={date}
              onChange={({ date }) =>
                date instanceof Date ? setDate(date) : undefined
              }
              styles={defaultStyles}
              minDate={new Date()}
              timePicker
              use12Hours
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
