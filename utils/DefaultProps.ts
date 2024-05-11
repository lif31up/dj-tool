export default interface DefaultProps<T> {
  className?: string;
  id?: string;
  title?: string;
  children?: any;
  src?: string;
  data?: T;
  onClick?: () => any;
}

export function isOfType<T>(obj: any): obj is T {
  return obj.hasOwnProperty(prop);
}
