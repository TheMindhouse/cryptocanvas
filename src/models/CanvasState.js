export const CANVAS_STATES = {
  active: 'active',
  bidding: 'bidding',
  completed: 'completed',
}

const BLOCKCHAIN_CANVAS_STATES = {
  0: CANVAS_STATES.active,
  1: CANVAS_STATES.bidding,
  2: CANVAS_STATES.completed,
}

export class CanvasState {
  constructor (canvasId, state) {
    if (BLOCKCHAIN_CANVAS_STATES[state] === 'undefined') {
      throw new Error('Incorrect canvas state')
    }

    this._canvasId = canvasId
    this._state = BLOCKCHAIN_CANVAS_STATES[state]
  }

  get canvasId () {
    return this._canvasId
  }

  get state () {
    return this._state
  }
}