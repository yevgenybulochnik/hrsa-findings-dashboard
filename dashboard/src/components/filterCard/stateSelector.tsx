import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, MultiSelect } from '@blueprintjs/select'


interface State {
  id: string;
  name: string;
  abv: string;
}

const StateRenderer: ItemRenderer<State> = (state, { handleClick, modifiers}) => {
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      id={state.id}
      key={state.id}
      label={state.abv}
      text={state.name}
      onClick={handleClick}
    />
  )
}

interface Props {
  stateItems: State[];
  selectedStates: State[];
  onItemSelect: () => void;
}

const stateFilter: ItemPredicate<State> = (query, state) => {
  return state.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

const StateSelect = MultiSelect.ofType<State>()

const StateSelector: React.SFC<Props> = (props) => {
  const {
    stateItems,
    selectedStates,
    onItemSelect
  } = props
  return (
    <FormGroup label='State Filter'>
      <StateSelect
        items={stateItems}
        itemRenderer={StateRenderer}
        itemPredicate={stateFilter}
        selectedItems={selectedStates}
        tagRenderer={(item) => item.abv}
        onItemSelect={onItemSelect}
        noResults={<MenuItem text='No Results' disabled />}
        fill
      />
    </FormGroup>
  )
}

export default StateSelector
