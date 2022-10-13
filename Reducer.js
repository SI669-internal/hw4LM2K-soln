
const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_NICKNAME = 'SET_NICKNAME';
const ADD_TAG = 'ADD_TAG';
const UPDATE_TAG = 'UPDATE_TAG';
const DELETE_TAG = 'DELETE_TAG';

const colors = [
  'rgb(113, 212, 245)', // blue
  'rgb(245, 113, 132)', // red
  'rgb(181, 245, 113)', // green
  'rgb(245, 245, 113)', // yellow
  'rgb(179, 113, 245)', // purple
  'rgb(245, 157, 113)'  // orange
]

const initTags = [
  { tagName: 'Personal', color: colors[0], key: Date.now() },
  { tagName: 'School', color: colors[1], key: Date.now() + 1},
  { tagName: '669', color: colors[2], key: Date.now() + 2},
];

const initListItems = [
  { text: 'Get candy', tags: [initTags[0].key], key: Date.now() },
  { text: 'Choose winter classes', tags: [initTags[1].key], key: Date.now() + 1},
  { text: 'Finish HW4', tags: [initTags[2].key, initTags[1].key], key: Date.now() + 2},
];

const initNickname = 'Jenny';

const initialState = {
  nickname: initNickname,
  tags: initTags,
  listItems: initListItems,
  colors: colors
}

const addItem = (state, newText, tags) => {
  let { listItems } = state;
  let newListItems = listItems.concat({
    text: newText,
    key: Date.now() + Math.random(),
    tags: tags
  });
  return {
    ...state, 
    listItems: newListItems
  };
}

const updateItem = (state, itemId, newText, tags) => {
  let { listItems } = state;
  let newItem = {
    text: newText,
    key: itemId, 
    tags: tags
  };
  let newListItems = listItems.map(elem=>elem.key===itemId?newItem:elem);
  return {
    ...state, 
    listItems: newListItems
  };
}

const deleteItem = (state, itemId) => {
  let { listItems } = state;
  let newListItems = listItems.filter(elem=>elem.key !== itemId);
  return {
    ...state, 
    listItems: newListItems
  }
}

const setNickname = (state, newName) => {
  return {
    ...state, 
    nickname: newName
  }
}

const addTag = (state, tagName, tagColor) => {
  return {
    ...state,
    tags: state.tags.concat({
      tagName: tagName,
      color: tagColor,
      key: Date.now()
    })
  }
}

const updateTag = (state, tagId, tagName, tagColor) => {
  let newTag = {
    tagName: tagName,
    color: tagColor,
    key: tagId
  }
  console.log('updating tag', tagId, 'old tags', state.tags);
  let newTags = state.tags.map(elem => elem.key===tagId ? newTag : elem);
  console.log('new tags', newTags);
  return {
    ...state,
    tags: newTags
  }  
}

const deleteTag = (state, tagId) => {
  let newListItems = [];
  state.listItems.forEach(elem=>{
    let newElem = {...elem};
    newElem.tags = elem.tags.filter(tagKey=>tagKey!==tagId);
    newListItems.push(newElem);
  });
  return {
    ...state,
    listItems: newListItems,
    tags: state.tags.filter(elem=>elem.key!==tagId)
  }
  
}


function rootReducer(state=initialState, action) {

const { type, payload } = action;

switch (type) {
    case ADD_ITEM:
      return addItem(state, payload.text, payload.tags);
    case UPDATE_ITEM:
      return updateItem(state, payload.key, payload.text, payload.tags);
    case DELETE_ITEM:
      return deleteItem(state, payload.key);
    case SET_NICKNAME:
      return setNickname(state, payload.nickname);
    case ADD_TAG:
      return addTag(state, payload.tagName, payload.tagColor);
    case UPDATE_TAG:
      return updateTag(state, payload.key, payload.tagName, payload.tagColor);
    case DELETE_TAG:
      return deleteTag(state, payload.key);
    default:
      return state;
  }
}

export { 
  rootReducer, 
  ADD_ITEM, 
  UPDATE_ITEM, 
  DELETE_ITEM, 
  SET_NICKNAME,
  ADD_TAG,
  UPDATE_TAG,
  DELETE_TAG
};