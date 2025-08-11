import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  Searchbar,
  List,
  useTheme,
  Text,
  Avatar,
  Checkbox,
  RadioButton,
  Card,
  Button,
  Icon,
} from "react-native-paper";

interface Option {
  id: string;
  title: string;
  description?: string;
  avatarUrl?: string;
}

interface OptionSelectionModalProps {
  options: Option[];
  onSelect: (selectedIds: string[]) => void;
  multiSelect?: boolean;
  selectedIds?: string[];
  title?: string;
}

const OptionSelectionModal: React.FC<OptionSelectionModalProps> = ({
  options,
  onSelect,
  multiSelect = false,
  selectedIds = [],
  title = "Select Option",
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onDismiss = () => setModalVisible(false);

  // Filter options only when searchQuery changes
  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q)
    );
  }, [searchQuery, options]);

  const handleSelect = useCallback(
    (id: string) => {
      if (multiSelect) {
        const updated = selectedIds.includes(id)
          ? selectedIds.filter((item) => item !== id)
          : [...selectedIds, id];
        onSelect(updated);
      } else {
        onSelect([id]);
        onDismiss(); // auto-close for single select
      }
    },
    [multiSelect, selectedIds, onSelect, onDismiss]
  );

  const renderItem = useCallback(
    ({ item }: { item: Option }) => {
      const selected = selectedIds.includes(item.id);

      return (
        <List.Item
          title={item.title}
          descriptionNumberOfLines={0}
          description={item.description}
          left={() =>
            item.avatarUrl ? (
              <Avatar.Image size={40} source={{ uri: item.avatarUrl }} />
            ) : (
              <Avatar.Icon size={40} icon="account" />
            )
          }
          style={{
            paddingRight: 0,
          }}
          containerStyle={{
            marginVertical: 0,
          }}
          right={() =>
            multiSelect ? (
              <Checkbox
                status={selected ? "checked" : "unchecked"}
                onPress={() => handleSelect(item.id)}
              />
            ) : (
              <RadioButton
                value={item.id}
                status={selected ? "checked" : "unchecked"}
                onPress={() => handleSelect(item.id)}
              />
            )
          }
          onPress={() => handleSelect(item.id)}
        />
      );
    },
    [multiSelect, selectedIds, handleSelect]
  );

  return (
    <>
      <List.Item
        onPress={() => setModalVisible(true)}
        titleStyle={{ fontWeight: 700 }}
        title={title}
        description={
          selectedIds.length > 0
            ? options
                .filter((v) => selectedIds.includes(v.id))
                .map((v) => v.title)
                .join(",")
            : "Select"
        }
        style={{
          paddingRight: 0,
          // paddingVertical: 0,
        }}
        containerStyle={{
          marginVertical: 0,
        }}
        contentStyle={{ paddingLeft: 0 }}
        right={(props) => <Icon {...props} source="chevron-down" size={24} />}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={onDismiss}
          contentContainerStyle={[
            styles.container,
            {
              backgroundColor: theme.colors.background,
              justifyContent: "flex-start",
              overflow: "hidden",
            },
          ]}
        >
          <Card.Title
            title={title}
            titleVariant="titleLarge"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              minHeight: "auto",
            }}
            titleStyle={{ marginBottom: 8 }}
          />
          <Card.Content
            style={{
              paddingHorizontal: 0,
              height: multiSelect ? "81%" : "90%",
            }}
          >
            <Searchbar
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
            />
            <FlatList
              style={{
                width: "100%",
              }}
              data={filteredOptions}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={styles.emptyText}>No matching results</Text>
              }
            />
          </Card.Content>
          {multiSelect && (
            <Card.Actions>
              <Button onPress={onDismiss}>Cancel</Button>
              <Button
                mode="contained"
                onPress={() => {
                  onSelect(selectedIds);
                  onDismiss();
                }}
              >
                Done
              </Button>
            </Card.Actions>
          )}
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    height: "60%",
  },
  searchbar: {
    marginBottom: 8,
    width: "100%",
  },
  emptyText: {
    textAlign: "center",
    padding: 16,
    color: "gray",
  },
});

export default React.memo(OptionSelectionModal);
