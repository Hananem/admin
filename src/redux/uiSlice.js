import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDropdownOpen: false,
  isNotificationsOpen: false,
  isSidebarOpen: false,
  isFilterMenuOpen: false,
  isEventFiltersOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDropdown: (state) => {
      state.isDropdownOpen = true;
    },
    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    openNotifications: (state) => {
      state.isNotificationsOpen = true;
    },
    closeNotifications: (state) => {
      state.isNotificationsOpen = false;
    },
    toggleNotifications: (state) => {
      state.isNotificationsOpen = !state.isNotificationsOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openFilterMenu: (state) => {
      state.isFilterMenuOpen = true;
    },
    closeFilterMenu: (state) => {
      state.isFilterMenuOpen = false;
    },
    openEventFilters: (state) => {
      state.isEventFiltersOpen = true;
    },
    closeEventFilters: (state) => {
      state.isEventFiltersOpen = false;
    },
  },
});

// Export actions to dispatch them in components
export const {
  openDropdown,
  closeDropdown,
  toggleDropdown,
  openNotifications,
  closeNotifications,
  toggleNotifications,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  openFilterMenu,
  closeFilterMenu,
  openEventFilters,
  closeEventFilters,
} = uiSlice.actions;

// Export reducer to include it in store
export default uiSlice.reducer;