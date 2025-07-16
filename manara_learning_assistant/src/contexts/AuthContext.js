import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const ADMIN_EMAILS = [
  "endalukalbesa511@gmail.com",
  "yohannisadmasu05@gmail.com",
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Update initial state to match the new, normalized structure
  const [subscription, setSubscription] = useState({
    plan: "basic",
    endDate: null,
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionStatus = useCallback(async (user) => {
    if (!user) {
      setSubscription({ plan: "basic", endDate: null });
      return;
    }
    try {
      const config = { headers: { "x-user-uid": user.uid } };
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/me`,
        config
      );

      console.log("Fetched raw subscription data:", response.data);

      // --- THIS IS THE FIX ---
      // Normalize the data from the backend to match what the frontend expects.
      const normalizedSubscription = {
        plan: response.data.subscription_plan,
        endDate: response.data.subscription_end_date,
      };

      setSubscription(normalizedSubscription);
      console.log("Set normalized subscription state:", normalizedSubscription);
    } catch (error) {
      console.error("Could not fetch subscription status.", error);
      if (error.response?.status === 404) {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/register`,
          { firebase_uid: user.uid, email: user.email }
        );
        setSubscription({ plan: "basic", endDate: null });
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && ADMIN_EMAILS.includes(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      await fetchSubscriptionStatus(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchSubscriptionStatus]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("session_id")) {
      if (currentUser) {
        console.log(
          "Stripe session detected, refetching subscription status..."
        );
        fetchSubscriptionStatus(currentUser);
        window.history.replaceState(null, null, window.location.pathname);
      }
    }
  }, [currentUser, fetchSubscriptionStatus]);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    subscription,
    isAdmin,
    logout,
    refetchSubscription: () => fetchSubscriptionStatus(currentUser),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
