import { Repository, NotificationsSliceState } from "@/app/types";
import { createAppSlice } from "@/lib/createAppSlice";
import fakeData from "./fakeData";

const initialState: NotificationsSliceState = {
  value: [],
  status: "idle",
};

export const newNotificationsSlice = createAppSlice({
  name: "newNotifications",
  initialState,
  reducers: (create) => ({
    getMoreNotifications: create.asyncThunk(
      async (repositories: Repository[]) => {
        // Simulate a network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = repositories.map((repository: Repository) => {
          return fakeData(repository);
        });
        return { data: await Promise.all(data) };
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value = state.value.concat(action.payload.data);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectNewNotifications: (notifications) => notifications.value,
    selectNewNotificationsStatus: (notifications) => notifications.status,
  },
});

export const { getMoreNotifications } = newNotificationsSlice.actions;
export const { selectNewNotifications, selectNewNotificationsStatus } = newNotificationsSlice.selectors;
