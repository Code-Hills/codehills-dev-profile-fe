export interface ProfileFormProps {
  onSubmit: (query: Record<string, any>) => void;
  data?: Record<string, any>;
  children?: React.ReactNode;
}
