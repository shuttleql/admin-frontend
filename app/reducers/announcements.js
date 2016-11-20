const initialState = [];

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANNOUNCEMENTS_FETCHED':
      return action.announcements.map(announcement => {
        return {
          ...announcement,
          ctime: new Date(announcement.ctime).toString()
        }
      });
    default:
      return state;
  }
};

export default announcementReducer;
