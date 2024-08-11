
import API from "./api";
import { feature } from "./feature";
import createApiSlice from "@/slice";

const ApiSlice = createApiSlice({
  name: feature,
  API: API,
});

export default ApiSlice.reducer;
