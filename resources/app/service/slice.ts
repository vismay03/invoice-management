
import GlobalApi from "./api";

import createApiSlice from "@/slice";

const ApiSlice = createApiSlice({
  name: 'api',
  API: GlobalApi,
});

export default ApiSlice.reducer;
