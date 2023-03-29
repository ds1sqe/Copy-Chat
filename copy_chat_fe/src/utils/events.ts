export function on(type: string, listener: EventListenerOrEventListenerObject) {
  console.log("add eventlistener", type);
  document.addEventListener(type, listener);
}

export function off(
  type: string,
  listener: EventListenerOrEventListenerObject
) {
  document.removeEventListener(type, listener);
}

export function emit(type: string, data: object) {
  const custom_event = new CustomEvent(type, { detail: data });
  console.log(custom_event);
  document.dispatchEvent(custom_event);
}
