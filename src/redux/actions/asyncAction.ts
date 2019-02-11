export type AsyncStatus = "start" | "success" | "failure";

type AsyncStatusHandler<T> = { [K in AsyncStatus]?: (state: T) => T };

export type AsyncAction<T> = {
  type: T;
  status: AsyncStatus;
};

export function handleAsyncAction<S, T>(
  state: S,
  action: AsyncAction<T>,
  handler: AsyncStatusHandler<S>
): S {
  let fn = handler[action.status];
  if (!fn) {
    fn = s => s;
  }
  return fn(state);
}
