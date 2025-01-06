import { Repository, Notification } from "@/app/types";
import { createAppSlice } from "@/lib/createAppSlice";
import fakeData from "./fakeData";

export interface NotificationsSliceState {
  notifications: {
    value: Array<Notification>;
    status: "idle" | "loading" | "failed";
  },
  newNotifications: {
    value: Array<Notification>;
    status: "idle" | "loading" | "failed";
  }
}

const initialState: NotificationsSliceState = {
  notifications: {
    value: [],
    status: 'idle',
  },
  newNotifications: {
    value: [],
    status: "idle",
  }
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
          state.notifications.status = "loading";
        },
        fulfilled: (state, action) => {
          state.notifications.status = "idle";
          state.notifications.value = action.payload.data;
        },
        rejected: (state) => {
          state.notifications.status = "failed";
        },
      },
    ),
    setNotificationSubscription: create.reducer((state, action: { payload: { id: string; ignored: boolean } }) => {
      const notification = state.notifications.value.find((notification) => notification.id === action.payload.id);
      if (notification) {
        notification.ignored = action.payload.ignored;
      }
    }),
    setNotificationAsRead: create.reducer((state, action: { payload: { id: string } }) => {
      const notification = state.notifications.value.find((notification) => notification.id === action.payload.id);
      if (notification) {
        notification.unread = false;
      }
    }),
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
          state.newNotifications.status = "loading";
        },
        fulfilled: (state, action) => {
          state.newNotifications.status = "idle";
          state.newNotifications.value = state.newNotifications.value.concat(action.payload.data);
        },
        rejected: (state) => {
          state.newNotifications.status = "failed";
        },
      },
    ),
    moveNotifications: create.reducer((state) => {
      state.notifications.value = state.notifications.value.concat(state.newNotifications.value);
      state.newNotifications.value = [];
    }),
  }),
  selectors: {
    selectNotifications: (state) => state.notifications.value,
    selectNotificationsStatus: (state) => state.notifications.status,
    selectNewNotifications: (state) => state.newNotifications.value,
    selectNewNotificationsStatus: (state) => state.newNotifications.status,
  },
});

export const { getNotifications, setNotificationSubscription, setNotificationAsRead, getMoreNotifications, moveNotifications } = notificationsSlice.actions;
export const { selectNotifications, selectNotificationsStatus, selectNewNotifications, selectNewNotificationsStatus } = notificationsSlice.selectors;
