import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function tagFromId(tagId, tagList) {
  let theTag = tagList.find(item=>(item.key===tagId));
  return theTag ? theTag : undefined;
}

function TagLabel({itemTags, allTags}) {

  const colors = useSelector((state) => state.colors);

  if (itemTags.length === 0) {
    return (
      <View/>
    );    
  } 
  if (itemTags.length >= 1) {
    let tag0 = tagFromId(itemTags[0], allTags);
    return (
      <View style={[styles.tagLabel]}>
        <Text style={styles.tagLabelText}>
          { tag0.tagName } 
          { itemTags.length > 1 ? (' +' + (itemTags.length - 1)) : '' }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagLabel: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: 'lightgray',
  },
  tagLabelText: {
    fontSize: 10
  }
});

export { TagLabel };