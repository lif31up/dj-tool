export default interface DefaultProps<T> {
  className?: string;
  id?: string;
  title?: string;
  children?: any;
  data?: T;
  onClick?: (parm: any) => any;
} // DefaultProp<T>
