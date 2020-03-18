import React, { useEffect, useState } from 'react';

export const TYPE = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
}

export function dialogReducer(state, action) {
  switch (action.type) {
    case TYPE.OPEN:
      return {...state, isOpen: true, ...action.payload};
    case TYPE.CLOSE:
      return {...state, isOpen: false};
    default:
      return state;
  }
}