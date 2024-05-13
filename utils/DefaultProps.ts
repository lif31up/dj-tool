export default interface DefaultProps<T> {
  className?: string;
  id?: string;
  title?: string;
  children?: any;
  src?: string;
  data?: T;
  onClick?: () => any;
}

export function isOfType<T>(value: any, type: string): value is T {
  return typeof value === type;
}
