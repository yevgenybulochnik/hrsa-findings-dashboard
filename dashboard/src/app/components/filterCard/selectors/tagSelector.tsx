import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, MultiSelect } from '@blueprintjs/select'


interface Tag {
  id: string;
  name: string;
  title: string;
}

const TagRenderer: ItemRenderer<Tag> = (tag, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      id={tag.id}
      key={tag.id}
      text={tag.title}
      onClick={handleClick}
    />
  )
}

const tagFilter: ItemPredicate<Tag> = (query, tag) => {
  return tag.title.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

interface Props {
  tagItems: Tag[];
  selectedTags: Tag[];
  onItemSelect: () => void;
  onTagRemove: () => void;
}

const TagSelect = MultiSelect.ofType<Tag>()

const TagSelector: React.SFC<Props> = (props) => {
  const {
    tagItems,
    selectedTags,
    onItemSelect,
    onTagRemove,
  } = props
  return (
    <FormGroup label='Finding Tag Filter'>
      <TagSelect
        items={tagItems}
        itemRenderer={TagRenderer}
        itemPredicate={tagFilter}
        selectedItems={selectedTags}
        tagRenderer={(item) => item.title}
        onItemSelect={onItemSelect}
        tagInputProps={{
          onRemove: onTagRemove
        }}
        noResults={<MenuItem text='No Results' disabled />}
        fill
        resetOnSelect
      />
    </FormGroup>
  )
}

export default TagSelector
