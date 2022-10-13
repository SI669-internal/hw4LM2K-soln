import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Input, Button } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TAG, UPDATE_TAG } from '../Reducer';

function TagDetailsScreen(props) {

  const colors = useSelector(state=>state.colors);
  console.log('in TDS', colors.entries());

  const dispatch = useDispatch();

  const { navigation, route } = props;
  const { tag } = route.params;
  if (!tag.color) {
    tag.color = colors[0];
  }

  const [inputText, setInputText] = useState(tag.tagName);
  const [selectedColor, setSelectedColor] = useState(tag.color);

  const addTag = (tagName, tagColor) => {
    dispatch({
      type: ADD_TAG,
      payload: {
        tagName: tagName, 
        tagColor: tagColor
      }
    });
  }

  const updateTag = (tag, tagName=tag.tagName, tagColor=tag.color) => {
    dispatch({
      type: UPDATE_TAG,
      payload: {
        key: tag.key,
        tagName: tagName, 
        tagColor: tagColor
      }
    });

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {tag.key===-1?'Add':'Edit'} Tag
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder='New Tag'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('SettingsHome');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (tag.key === -1) {
              addTag(inputText, selectedColor);
            } else {
              updateTag(tag, inputText, selectedColor);
            }
            navigation.navigate('SettingsHome');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '20%'
  }, 
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '5%'
  },
  headerText: {
    fontSize: 32
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  inputStyle:{
    fontSize: 18,
  },
  colorSwatchContainer: {
    flex: 0.1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatches: {
    flexDirection: 'row',
    width: '100%', 
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colorSwatch: {
    borderRadius: 6,
    borderWidth: 0,
    width: 40,
    height: 40
  },
  selectedSwatch: {
    borderWidth: 2,
    borderColor: 'black'
  },
  tagContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  tagLabel: {
    margin: 3,
    padding: 3, 
    backgroundColor: 'lightgray',
    borderRadius: 6,
    borderWidth: 0
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default TagDetailsScreen;