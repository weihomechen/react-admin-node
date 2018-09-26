import * as moment from 'moment';

export function relativeTime(time) {
  return moment(new Date(time * 1000)).fromNow();
}

interface MsgData {
  action: string;
  payload: object;
}

interface Message {
  meta: object;
  data: MsgData;
}

export function parseMsg(
  action: string,
  payload: object = {},
  metadata: object = {},
): Message {
  const meta = Object.assign({}, {
    timestamp: Date.now(),
  }, metadata);

  return {
    meta,
    data: {
      action,
      payload,
    },
  };
};
