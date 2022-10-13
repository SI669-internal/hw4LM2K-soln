
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { DELETE_TAG } from '../Reducer';

function TagListItem(props) {

  const { tag, navigation } = props;
  const dispatch = useDispatch();
  const deleteTag = (tag) => {
    dispatch({
      type: DELETE_TAG,
      payload: {
        key: tag.key
      }
    })
  }

  return (
    <View style={styles.listItemContainer}>
      <View style={styles.li1Container}>
        <TouchableOpacity 
          style={[styles.li1]}
          onPress={()=>{
            navigation.navigate('TagDetails', { 
              tag: tag 
            });
          }}  
        >
          <Text style={styles.listItemText}>{tag.tagName}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.li2}
        onPress={()=>{
          deleteTag(tag);
        }}  
      >
        <Icon 
          name="trash"
          type="font-awesome"
          color="black"
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
//    paddingLeft: '15%',
  },
  li1Container: {
    flex: 0.4, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start'

  },
  li1: {
    padding: '1%',
    borderRadius: 6, 
  },
  li2: {
    flex: 0.2,
  },
  listItemText: {
    fontSize: 14, 
  },
});

export default TagListItem;