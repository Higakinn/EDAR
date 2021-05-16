export type InitialState = {
  isLoggedIn: boolean;
  user: {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
};
