export interface State {
  isLoading: boolean;
  data: any[];
  error: any[];
  links: any[];
  edit: any[];
  isError: boolean;
  status: number;
  currentPage: number;
  lastPage: number;
  isSaving: boolean;
}
export const initialState: State = {
  isLoading: false,
  data: [],
  links: [],
  error: [],
  edit: [],
  status: 0,
  lastPage: 0,
  isError: false,
  currentPage: 1,
  isSaving: false,

};

export type SliceType = {
  name: string;
  API: any;
};
