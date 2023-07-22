export type TAccountFile = {
  id: string;
  name: string;
  tabs: Array<{
    id: string;
    isSelected: boolean;
    name: string;
  }>;
};
