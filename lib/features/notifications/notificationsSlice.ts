import { Repository, Notification } from "@/app/types";
import { createAppSlice } from "@/lib/createAppSlice";
import fakeData from "./fakeData";

export interface NotificationsSliceState {
  value: Array<Notification>;
  status: "idle" | "loading" | "failed";
}

const initialState: NotificationsSliceState = {
  value: [],
  status: "idle",
};

export const notificationsSlice = createAppSlice({
  name: "notifications",
  initialState,
  reducers: (create) => ({
    getNotifications: create.asyncThunk(
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
          state.value = action.payload.data;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    setNotificationSubscription: create.reducer((state, action) => {
      const notification = state.value.find((notification) => notification.id === action.id);
      if (notification) {
        notification.ignored = action.ignored;
      }
    }),
    setNotificationAsRead: create.reducer((state, action) => {
      const notification = state.value.find((notification) => notification.id === action.id);
      if (notification) {
        notification.unread = false;
      }
    }),
  }),
  selectors: {
    selectNotifications: (notifications) => notifications.value,
    selectNotificationsStatus: (notifications) => notifications.status,
  },
});

export const { getNotifications, setNotificationSubscription, setNotificationAsRead } = notificationsSlice.actions;
export const { selectNotifications, selectNotificationsStatus } = notificationsSlice.selectors;
