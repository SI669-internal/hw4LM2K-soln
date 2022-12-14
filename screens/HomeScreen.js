import { useSelector } from "react-redux";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "@rneui/base";

import ListItem from "../components/ListItem";

function HomeScreen(props) {
  
  const { navigation, route } = props;
  const listItems = useSelector((state) => state.listItems);
  const nickname = useSelector((state) => state.nickname);
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{nickname}'s List</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={listItems}
          renderItem={({item})=>{
            return (
              <ListItem item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      <Button
        title='Add'
        onPress={()=>{
          navigation.navigate('Details', {
            item: {key: -1, text: '', tags: []}
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '10%',
//    paddingBottom: '5%',
    paddingTop: '25%'
  },
  headerText: {
    fontSize: 32
  },
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
  },
  menuContainer: {
    padding: '5%'
  },
  menuText: {
    fontSize: 32
  }
});

export default HomeScreen;