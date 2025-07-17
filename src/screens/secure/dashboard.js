import React from 'react';
import {Box, Heading, ScrollView, VStack, Center, Button} from 'native-base';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';



export const Dashboard = () => {
  const dispatch = useDispatch();
  const email = null
  return (
    <Box safeArea py="8" style={Styles.container}>
      <ScrollView
        keyboardDismissMode="interactive"
        _contentContainerStyle={Styles.scrollView}>
        <VStack alignItems="center">
          <Center w="90%">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}>
              {`Welcome ${email}`}
            </Heading>
            <Button>
              Logout
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
};

const Styles = StyleSheet.create({
  container: {display: 'flex', flex: 1},
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Dashboard;
