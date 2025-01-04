import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchRepositories } from "./repositoriesAPI";
import { GetRepositoriesOptions, Repository } from "@/app/types";

export interface RepositoriesSliceState {
  value: Array<Repository>;
  status: "idle" | "loading" | "failed";
}

const initialState: RepositoriesSliceState = {
  value: [],
  status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const repositoriesSlice = createAppSlice({
  name: "repositories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    getRepositories: create.asyncThunk(
      async (options: GetRepositoriesOptions) => {
        const { data } = await fetchRepositories(options);
        return data;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectRepositories: (repositories) => repositories.value,
    selectRepositoriesStatus: (repositories) => repositories.status,
  },
});

// Action creators are generated for each case reducer function.
export const { getRepositories } =
  repositoriesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectRepositories, selectRepositoriesStatus } = repositoriesSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// TODO: Move useEffects to thunks
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState());

//       if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//         dispatch(incrementByAmount(amount));
//       }
//     };