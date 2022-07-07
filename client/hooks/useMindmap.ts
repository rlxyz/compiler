import { useReducer } from 'react'

// collapsed tracks the last expanded index - used to account for z-index issues
export enum MapPieceStates {
  START,
  EXPANDED,
  COLLAPSED,
  HIDDEN,
}

type MapState = Array<MapPieceStates>

type MapAction = {
  index: number
}

const mapReducer = (state: MapState, action: MapAction) => {
  let newState = [...state]

  // toggle state
  switch (newState[action.index]) {
    case MapPieceStates.START:
    case MapPieceStates.COLLAPSED:
      newState = new Array(state.length).fill(MapPieceStates.HIDDEN)
      newState[action.index] = MapPieceStates.EXPANDED
      break
    case MapPieceStates.EXPANDED:
      newState = new Array(state.length).fill(MapPieceStates.START)
      newState[action.index] = MapPieceStates.COLLAPSED
      break
    default:
      return state
  }
  return newState
}

const useMindmap = (length: number) => {
  // store mindmap state as an array of length length
  const [state, dispatch] = useReducer(
    mapReducer,
    new Array(length).fill(MapPieceStates.START)
  )

  return {
    state,
    dispatch,
  }
}

export default useMindmap
